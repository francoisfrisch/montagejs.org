montageDefine("341fbb9","ui/input-range.reel/input-range",{dependencies:["ui/text-input","montage/composer/press-composer"],factory:function(e,t){var n=e("ui/text-input").TextInput,a=e("montage/composer/press-composer").PressComposer,s=t.InputRange=n.specialize({prepareForActivationEvents:{value:function(){var e=new a;e.delegate=this,this.addComposer(e),e.addEventListener("pressStart",this,!1),e.addEventListener("press",this,!1),e.addEventListener("pressCancel",this,!1)}},handlePressStart:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("montage_range_interaction_start",!0,!0,null),this.dispatchEvent(e)}},handlePress:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("montage_range_interaction_end",!0,!0,null),this.dispatchEvent(e)}},surrenderPointer:{value:function(){return!1}}});s.addAttributes({max:{dataType:"number"},min:{dataType:"number"},step:null})}});