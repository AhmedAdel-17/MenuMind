import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppSelector, useAppDispatch } from '../../core/store/hooks';
import type { MenuStackParamList } from '../../navigation/MainTabNavigator';
import { setSearchQuery, addMenuItem } from '../../core/store/slices/menuSlice';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Spacing, BorderRadius } from '../../core/theme';

type MenuScreenNavProp = NativeStackNavigationProp<MenuStackParamList, 'MenuMain'>;

const MenuScreen: React.FC = () => {
    const { colors } = useAppTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<MenuScreenNavProp>();
    
    const menuItems = useAppSelector(state => state.menu.items);
    const searchQuery = useAppSelector(state => state.menu.searchQuery);
    const [showAddModal, setShowAddModal] = React.useState(false);
    
    // Add Item Form State
    const [newItemName, setNewItemName] = React.useState('');
    const [newItemCategory, setNewItemCategory] = React.useState('');
    const [newItemCost, setNewItemCost] = React.useState('');
    const [newItemPrice, setNewItemPrice] = React.useState('');
    const [formError, setFormError] = React.useState('');

    const handleAddItem = () => {
        setFormError('');
        if (!newItemName || !newItemCategory || !newItemCost || !newItemPrice) {
            setFormError('All fields are required.');
            return;
        }
        const cost = parseFloat(newItemCost);
        const price = parseFloat(newItemPrice);
        
        if (isNaN(cost) || isNaN(price)) {
            setFormError('Cost and Price must be valid numbers.');
            return;
        }
        
        const margin = price - cost;
        const marginPercent = price > 0 ? (margin / price) * 100 : 0;
        
        dispatch(addMenuItem({
            id: Math.random().toString(36).substring(7),
            name: newItemName,
            category: newItemCategory,
            cost,
            price,
            margin,
            marginPercent,
            rating: 0,
            feedback: 0,
        }));
        
        // Reset and close
        setNewItemName('');
        setNewItemCategory('');
        setNewItemCost('');
        setNewItemPrice('');
        setShowAddModal(false);
    };

    const filteredItems = menuItems.filter(
        item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const avgMargin = menuItems.length > 0 ?
        menuItems.reduce((sum, item) => sum + item.marginPercent, 0) /
        menuItems.length : 0;
    const avgRating = menuItems.length > 0 ?
        menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length : 0;

    const getMarginBgColor = (marginPercent: number) => {
        if (marginPercent >= 60) return colors.primary + '33';
        if (marginPercent >= 55) return colors.accent + '33';
        return colors.destructive + '33';
    };

    const getMarginBorderColor = (marginPercent: number) => {
        if (marginPercent >= 60) return colors.primary + '4D';
        if (marginPercent >= 55) return colors.accent + '4D';
        return colors.destructive + '4D';
    };

    const getMarginBadgeColors = (marginPercent: number) => {
        if (marginPercent >= 60)
            return { bg: colors.primary + '1A', text: colors.primary };
        if (marginPercent >= 55)
            return { bg: colors.accent + '1A', text: colors.accent };
        return { bg: colors.destructive + '1A', text: colors.destructive };
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="Menu Management"
                subtitle="Manage your menu items and analyze cost margins"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Search */}
                <View
                    style={[
                        styles.searchContainer,
                        { backgroundColor: colors.inputBackground, borderColor: colors.border },
                    ]}>
                    <Icon name="search" size={18} color={colors.mutedForeground} />
                    <TextInput
                        placeholder="Search menu items..."
                        placeholderTextColor={colors.mutedForeground}
                        value={searchQuery}
                        onChangeText={t => dispatch(setSearchQuery(t))}
                        style={[styles.searchInput, { color: colors.foreground }]}
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    <Button variant="outline" style={styles.flex1}>
                        <Icon name="upload" size={16} color={colors.foreground} />
                        <Text style={[styles.buttonTextOutline, { color: colors.foreground }]}>
                            Upload CSV
                        </Text>
                    </Button>
                    <Button onPress={() => setShowAddModal(true)} style={styles.flex1}>
                        <Icon name="plus" size={16} color="#fff" />
                        <Text style={styles.buttonTextPrimary}>Add Item</Text>
                    </Button>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryRow}>
                    <Card style={styles.summaryCard}>
                        <View style={styles.summaryInner}>
                            <View>
                                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                                    Total Items
                                </Text>
                                <Text style={[styles.summaryValue, { color: colors.foreground }]}>
                                    {menuItems.length}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: colors.primary + '1A' },
                                ]}>
                                <Icon name="dollar-sign" size={24} color={colors.primary} />
                            </View>
                        </View>
                    </Card>

                    <Card style={styles.summaryCard}>
                        <View style={styles.summaryInner}>
                            <View>
                                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                                    Avg Margin
                                </Text>
                                <Text style={[styles.summaryValue, { color: colors.foreground }]}>
                                    {avgMargin.toFixed(1)}%
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: colors.accent + '1A' },
                                ]}>
                                <Icon name="trending-up" size={24} color={colors.accent} />
                            </View>
                        </View>
                    </Card>

                    <Card style={styles.summaryCard}>
                        <View style={styles.summaryInner}>
                            <View>
                                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                                    Avg Rating
                                </Text>
                                <Text style={[styles.summaryValue, { color: colors.foreground }]}>
                                    {avgRating.toFixed(1)}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: colors.accent + '1A' },
                                ]}>
                                <Icon name="star" size={24} color={colors.accent} />
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Menu Items */}
                {filteredItems.map(item => {
                    const badgeColors = getMarginBadgeColors(item.marginPercent);
                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('MenuItemDetails', { itemId: item.id })}
                        >
                            <Card
                                variant="bordered"
                                borderColor={getMarginBorderColor(item.marginPercent)}
                                style={{ 
                                    backgroundColor: getMarginBgColor(item.marginPercent),
                                    elevation: 0,
                                    shadowOpacity: 0,
                                }}>
                            <View style={styles.itemHeader}>
                                <View style={styles.flex1}>
                                    <Text
                                        style={[
                                            styles.itemName,
                                            { color: colors.foreground },
                                        ]}>
                                        {item.name}
                                    </Text>
                                    <Badge variant="outline">{item.category}</Badge>
                                </View>
                                <Badge backgroundColor={badgeColors.bg} textColor={badgeColors.text}>
                                    {`${item.marginPercent.toFixed(0)}%`}
                                </Badge>
                            </View>

                            <View style={styles.priceGrid}>
                                <View>
                                    <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>
                                        Cost
                                    </Text>
                                    <Text style={[styles.priceValue, { color: colors.foreground }]}>
                                        EGP {item.cost}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>
                                        Price
                                    </Text>
                                    <Text style={[styles.priceValue, { color: colors.foreground }]}>
                                        EGP {item.price}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.itemFooter, { borderTopColor: colors.border }]}>
                                <View style={styles.ratingRow}>
                                    <Icon name="star" size={14} color={colors.accent} />
                                    <Text style={[styles.ratingText, { color: colors.foreground }]}>
                                        {item.rating}
                                    </Text>
                                    <Text style={[styles.ratingCount, { color: colors.mutedForeground }]}>
                                        ({item.feedback})
                                    </Text>
                                </View>
                                <View style={styles.profitInfo}>
                                    <Text
                                        style={[styles.profitValue, { color: colors.primary }]}>
                                        EGP {item.margin}
                                    </Text>
                                    <Text style={[styles.profitLabel, { color: colors.mutedForeground }]}>
                                        profit/unit
                                    </Text>
                                </View>
                            </View>
                        </Card>
                        </TouchableOpacity>
                    );
                })}

                {filteredItems.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={{ color: colors.mutedForeground }}>
                            No items found matching your search.
                        </Text>
                    </View>
                )}

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>

            {/* Add Item Modal */}
            <Modal visible={showAddModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: colors.card },
                        ]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
                                Add Menu Item
                            </Text>
                            <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                <Icon name="x" size={24} color={colors.foreground} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalForm}>
                            <View style={styles.formField}>
                                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                                    Item Name
                                </Text>
                                <TextInput
                                    placeholder="e.g., Margherita Pizza"
                                    placeholderTextColor={colors.mutedForeground}
                                    value={newItemName}
                                    onChangeText={setNewItemName}
                                    style={[
                                        styles.fieldInput,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            color: colors.foreground,
                                            borderColor: colors.border,
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.formField}>
                                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                                    Category
                                </Text>
                                <TextInput
                                    placeholder="e.g., Pizza"
                                    placeholderTextColor={colors.mutedForeground}
                                    value={newItemCategory}
                                    onChangeText={setNewItemCategory}
                                    style={[
                                        styles.fieldInput,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            color: colors.foreground,
                                            borderColor: colors.border,
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.priceGrid}>
                                <View style={styles.flex1}>
                                    <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                                        Cost (EGP)
                                    </Text>
                                    <TextInput
                                        placeholder="45"
                                        keyboardType="numeric"
                                        placeholderTextColor={colors.mutedForeground}
                                        value={newItemCost}
                                        onChangeText={setNewItemCost}
                                        style={[
                                            styles.fieldInput,
                                            {
                                                backgroundColor: colors.inputBackground,
                                                color: colors.foreground,
                                                borderColor: colors.border,
                                            },
                                        ]}
                                    />
                                </View>
                                <View style={styles.flex1}>
                                    <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                                        Price (EGP)
                                    </Text>
                                    <TextInput
                                        placeholder="120"
                                        keyboardType="numeric"
                                        placeholderTextColor={colors.mutedForeground}
                                        value={newItemPrice}
                                        onChangeText={setNewItemPrice}
                                        style={[
                                            styles.fieldInput,
                                            {
                                                backgroundColor: colors.inputBackground,
                                                color: colors.foreground,
                                                borderColor: colors.border,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>
                            {formError ? <Text style={[styles.errorText, { color: colors.destructive }]}>{formError}</Text> : null}
                            <Button onPress={handleAddItem} fullWidth>Add Item</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.lg, gap: Spacing.lg },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        gap: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: Spacing.md,
        fontSize: 15,
    },
    actionRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    flex1: { flex: 1 },
    summaryRow: { gap: Spacing.md },
    summaryCard: {},
    summaryInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: { fontSize: 13, marginBottom: 4 },
    summaryValue: { fontSize: 28, fontWeight: '700' },
    summaryIcon: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    itemName: { fontSize: 17, fontWeight: '600', marginBottom: Spacing.xs },
    priceGrid: {
        flexDirection: 'row',
        gap: Spacing.lg,
        marginBottom: Spacing.md,
    },
    priceLabel: { fontSize: 12, marginBottom: 2 },
    priceValue: { fontSize: 15, fontWeight: '600' },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingTop: Spacing.md,
        marginBottom: Spacing.md,
    },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: 14, fontWeight: '500' },
    emptyState: {
        paddingVertical: Spacing['5xl'],
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        padding: Spacing.xl,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    modalTitle: { fontSize: 20, fontWeight: '700' },
    modalForm: { gap: Spacing.lg },
    formField: { gap: Spacing.xs },
    fieldLabel: { fontSize: 14, fontWeight: '500' },
    fieldInput: {
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        fontSize: 15,
    },
    buttonTextPrimary: { color: '#fff', fontWeight: '600' },
    buttonTextOutline: { fontWeight: '600' },
    ratingCount: { fontSize: 13 },
    profitInfo: { alignItems: 'flex-end' },
    profitValue: { fontWeight: '600', fontSize: 14 },
    profitLabel: { fontSize: 11 },
    errorText: { fontSize: 13, marginTop: -4 },
});

export default MenuScreen;
