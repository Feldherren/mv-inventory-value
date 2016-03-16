/*:
 * @plugindesc Calculates the value of all items in inventory.
 * @author Feldherren
 *
 * @param Item Value Variable
 * @desc ID of variable in which total item value will be stored.
 * @default 1
 *
 * @param Weapon Value Variable
 * @desc ID of variable in which total weapon value will be stored.
 * @default 2
 *
 * @param Armour Value Variable
 * @desc ID of variable in which total armour value will be stored.
 * @default 3
 *
 * @param Total Value Variable
 * @desc ID of variable in which total overall value will be stored.
 * @default 4
 *
 * @help Inventory Value v1.0, by Feldherren (rpaliwoda AT googlemail.com)

Plugin commands:
INVENTORYVALUE
INVENTORYVALUE [inventory]

Free for use with commercial projects, though I'd appreciate being
contacted if you do use it in any games, just to know.

Calculates the value of all items, weapons and armour an inventory 
and outputs the results into specified variables.
 */ 
(function() {

var parameters = PluginManager.parameters('Feld_InventoryValue');

var inventory = $gameParty.getInventory("hoard"); // this needs fixing - implement plugin command that either gets the default inventory or a named inventory

var weaponvalue = 0;
for (var key in inventory.weapons)
{
weaponvalue += $dataWeapons[key].price * inventory.weapons[key];
}
$gameVariables.setValue(parameters["Weapon Value Variable"], weaponvalue);

var armorvalue = 0;
for (var key in inventory.armors)
{
armorvalue += $dataArmors[key].price * inventory.armors[key];
}
$gameVariables.setValue(parameters["Armour Value Variable"], armorvalue);

var itemvalue = 0;
for (var key in inventory.items)
{
itemvalue += $dataItems[key].price * inventory.items[key];
}
$gameVariables.setValue(parameters["Item Value Variable"], itemvalue);


$gameVariables.setValue(parameters["Total Value Variable"], weaponvalue + armorvalue + itemvalue );


})();