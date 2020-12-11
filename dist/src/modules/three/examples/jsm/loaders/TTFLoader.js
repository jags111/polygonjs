import {FileLoader as FileLoader2} from "three/src/loaders/FileLoader";
import {Loader as Loader2} from "three/src/loaders/Loader";
import {opentype} from "../libs/opentype.module.min.js";
var TTFLoader = function(manager) {
  Loader2.call(this, manager);
  this.reversed = false;
};
TTFLoader.prototype = Object.assign(Object.create(Loader2.prototype), {
  constructor: TTFLoader,
  load: function(url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new FileLoader2(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(buffer) {
      try {
        onLoad(scope.parse(buffer));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  },
  parse: function(arraybuffer) {
    function convert(font, reversed) {
      var round = Math.round;
      var glyphs = {};
      var scale = 1e5 / ((font.unitsPerEm || 2048) * 72);
      var glyphIndexMap = font.encoding.cmap.glyphIndexMap;
      var unicodes = Object.keys(glyphIndexMap);
      for (var i = 0; i < unicodes.length; i++) {
        var unicode = unicodes[i];
        var glyph = font.glyphs.glyphs[glyphIndexMap[unicode]];
        if (unicode !== void 0) {
          var token = {
            ha: round(glyph.advanceWidth * scale),
            x_min: round(glyph.xMin * scale),
            x_max: round(glyph.xMax * scale),
            o: ""
          };
          if (reversed) {
            glyph.path.commands = reverseCommands(glyph.path.commands);
          }
          glyph.path.commands.forEach(function(command) {
            if (command.type.toLowerCase() === "c") {
              command.type = "b";
            }
            token.o += command.type.toLowerCase() + " ";
            if (command.x !== void 0 && command.y !== void 0) {
              token.o += round(command.x * scale) + " " + round(command.y * scale) + " ";
            }
            if (command.x1 !== void 0 && command.y1 !== void 0) {
              token.o += round(command.x1 * scale) + " " + round(command.y1 * scale) + " ";
            }
            if (command.x2 !== void 0 && command.y2 !== void 0) {
              token.o += round(command.x2 * scale) + " " + round(command.y2 * scale) + " ";
            }
          });
          glyphs[String.fromCodePoint(glyph.unicode)] = token;
        }
      }
      return {
        glyphs,
        familyName: font.getEnglishName("fullName"),
        ascender: round(font.ascender * scale),
        descender: round(font.descender * scale),
        underlinePosition: font.tables.post.underlinePosition,
        underlineThickness: font.tables.post.underlineThickness,
        boundingBox: {
          xMin: font.tables.head.xMin,
          xMax: font.tables.head.xMax,
          yMin: font.tables.head.yMin,
          yMax: font.tables.head.yMax
        },
        resolution: 1e3,
        original_font_information: font.tables.name
      };
    }
    function reverseCommands(commands) {
      var paths = [];
      var path;
      commands.forEach(function(c) {
        if (c.type.toLowerCase() === "m") {
          path = [c];
          paths.push(path);
        } else if (c.type.toLowerCase() !== "z") {
          path.push(c);
        }
      });
      var reversed = [];
      paths.forEach(function(p) {
        var result = {
          type: "m",
          x: p[p.length - 1].x,
          y: p[p.length - 1].y
        };
        reversed.push(result);
        for (var i = p.length - 1; i > 0; i--) {
          var command = p[i];
          var result = {type: command.type};
          if (command.x2 !== void 0 && command.y2 !== void 0) {
            result.x1 = command.x2;
            result.y1 = command.y2;
            result.x2 = command.x1;
            result.y2 = command.y1;
          } else if (command.x1 !== void 0 && command.y1 !== void 0) {
            result.x1 = command.x1;
            result.y1 = command.y1;
          }
          result.x = p[i - 1].x;
          result.y = p[i - 1].y;
          reversed.push(result);
        }
      });
      return reversed;
    }
    if (typeof opentype === "undefined") {
      console.warn("THREE.TTFLoader: The loader requires opentype.js. Make sure it's included before using the loader.");
      return null;
    }
    return convert(opentype.parse(arraybuffer), this.reversed);
  }
});
export {TTFLoader};
