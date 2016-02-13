///<reference path="../../../math/Vector.ts"/>
///<reference path="Shape.ts"/>
///<reference path="../../../util/JsonLoader.ts"/>
module entityframework.components.drawing {

    import serialize = util.serialize;
    import observe = framework.observe;

    /**
     * A shape that represents a rectangle.
     */
    @serialize.ProvideClass(RectangleShape, "sf::RectangleShape")
    export class RectangleShape extends Shape implements editorcanvas.drawing.CanvasDrawnElement {
        @ObserveObject()
        dimension : math.Vector;

        constructor(dimension? : math.Vector) {
            super();
            this.dimension = dimension || new math.Vector();
        }

        getDrawable() {
            var rec = new createjs.Shape();
            rec.graphics.beginFill(this.fillColor.rgbaStringFormat()).drawRect(
                -(this.dimension.x / 2),
                -(this.dimension.y / 2),
                this.dimension.x,
                this.dimension.y);
            return rec;
        }


        get type() : ShapeType {
            return ShapeType.Rectangle;
        }
    }

    export class RectangleShapeViewModel extends framework.ViewModel<RectangleShape> {
        get viewFile() : string {
            return "drawables/rectangle_shape";
        }
    }

    export class RectangleShapeFactory implements ShapeFactory {
        createFormVM() : framework.ViewModel<any> {
            return new RectangleShapeViewModel();
        }

        createShape() : Shape {
            return new RectangleShape();
        }
    }
}
