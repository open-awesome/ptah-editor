# How adding a new element works:

- Add a component to the new element in @/componets/elements.
- Add a new type for the new element in @/editor/types.js
- Add the connected to the type object in @/editor/types.js. It describes all properties for the new element.
- Add the new element to a list that contains the slot's elements: @/componets/slot/ElementList.vue
The new element needs a panel to be editable: @/editor/componets/panels/ThePanelNewElement.vue. It controls element properties @/editor/componets/controls/TheControlNewElement.vue
