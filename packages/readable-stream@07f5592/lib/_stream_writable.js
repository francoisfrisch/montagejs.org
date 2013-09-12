function WriteReq(e,t,n){this.chunk=e,this.encoding=t,this.callback=n}function WritableState(e,t){e=e||{};var n=e.highWaterMark;this.highWaterMark=n||0===n?n:16384,this.objectMode=!!e.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var r=e.decodeStrings===!1;this.decodeStrings=!r,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.buffer=[]}function Writable(e){return this instanceof Writable||this instanceof require("./_stream_duplex")?(this._writableState=new WritableState(e,this),this.writable=!0,Stream.call(this),void 0):new Writable(e)}function writeAfterEnd(e,t,n){var r=Error("write after end");e.emit("error",r),process.nextTick(function(){n(r)})}function validChunk(e,t,n,r){var i=!0;if(!Buffer.isBuffer(n)&&"string"!=typeof n&&null!==n&&void 0!==n&&!t.objectMode){var a=new TypeError("Invalid non-string/buffer chunk");e.emit("error",a),process.nextTick(function(){r(a)}),i=!1}return i}function decodeChunk(e,t,n){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=new Buffer(t,n)),t}function writeOrBuffer(e,t,n,r,i){n=decodeChunk(t,n,r);var a=t.objectMode?1:n.length;t.length+=a;var o=t.length<t.highWaterMark;return t.needDrain=!o,t.writing?t.buffer.push(new WriteReq(n,r,i)):doWrite(e,t,a,n,r,i),o}function doWrite(e,t,n,r,i,a){t.writelen=n,t.writecb=a,t.writing=!0,t.sync=!0,e._write(r,i,t.onwrite),t.sync=!1}function onwriteError(e,t,n,r,i){n?process.nextTick(function(){i(r)}):i(r),e.emit("error",r)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var n=e._writableState,r=n.sync,i=n.writecb;if(onwriteStateUpdate(n),t)onwriteError(e,n,r,t,i);else{var a=needFinish(e,n);a||n.bufferProcessing||!n.buffer.length||clearBuffer(e,n),r?process.nextTick(function(){afterWrite(e,n,a,i)}):afterWrite(e,n,a,i)}}function afterWrite(e,t,n,r){n||onwriteDrain(e,t),r(),n&&finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;for(var n=0;t.buffer.length>n;n++){var r=t.buffer[n],i=r.chunk,a=r.encoding,o=r.callback,s=t.objectMode?1:i.length;if(doWrite(e,t,s,i,a,o),t.writing){n++;break}}t.bufferProcessing=!1,t.buffer.length>n?t.buffer=t.buffer.slice(n):t.buffer.length=0}function needFinish(e,t){return t.ending&&0===t.length&&!t.finished&&!t.writing}function finishMaybe(e,t){var n=needFinish(e,t);return n&&(t.finished=!0,e.emit("finish")),n}function endWritable(e,t,n){t.ending=!0,finishMaybe(e,t),n&&(t.finished?process.nextTick(n):e.once("finish",n)),t.ended=!0}module.exports=Writable,Writable.WritableState=WritableState;var util=require("util"),assert=require("assert"),Stream=require("stream");util.inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,t,n){var r=this._writableState,i=!1;return"function"==typeof t&&(n=t,t=null),Buffer.isBuffer(e)?t="buffer":t||(t=r.defaultEncoding),"function"!=typeof n&&(n=function(){}),r.ended?writeAfterEnd(this,r,n):validChunk(this,r,e,n)&&(i=writeOrBuffer(this,r,e,t,n)),i},Writable.prototype._write=function(e,t,n){n(Error("not implemented"))},Writable.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),e!==void 0&&null!==e&&this.write(e,t),r.ending||r.finished||endWritable(this,r,n)};