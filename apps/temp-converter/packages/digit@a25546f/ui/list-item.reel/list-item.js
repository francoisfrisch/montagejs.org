var Component=require("montage/ui/component").Component;exports.ListItem=Component.specialize({highlight:{value:!1},constructor:{value:function(){this.super(),this.defineBinding("classList.has('digit-ListItem--highlight')",{"<-":"highlight"})}}});