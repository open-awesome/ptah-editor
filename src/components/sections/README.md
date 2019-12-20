# How to make a section
A section - is the main building block in the editor. Elements (text, picture, buttons, etc.) are grouped into slots inside of each section.
The number of slots and their relative positions inside of the section is defined from the start. The default elements in each section can be removed or replaced. The number of elements in the slot is indefinite. 

![Section](https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/279d9b71-a6e4-4711-9b7d-f8e7ba4800ab.jpg)

All section components are split into groups and can be found here 
```
src/components/sections/
```
You can make a new group or add your component to an existing one. It may be useful to take a look at [this well-commented example](https://github.com/ProtocolONE/ptah-editor/tree/develop/src/components/sections/sample.vue) before you create a new section as it explains the whole process well.
You need to turn on the component [in the editor](https://github.com/ProtocolONE/ptah-editor/blob/develop/src/components/pages/VuseEditor.vue) after you have created it.

Done. Now your section can be found in the left panel of Ptah editor.
