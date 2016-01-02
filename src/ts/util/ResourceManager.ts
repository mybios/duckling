module util.resource {
    var _resources : {[type : string] : {[key : string] : any}} = {};

    export function addAsset(asset : entityframework.map.Asset, loadedObj : any) {
        if (!_resources[asset.type]) {
            _resources[asset.type] = {};
        }
        if (!_resources[asset.type][asset.key]) {
            _resources[asset.type][asset.key] = loadedObj;
        }
    }

    export function hasAsset(asset : entityframework.map.Asset) : boolean {
        return _resources[asset.type] && _resources[asset.type][asset.key];
    }

    export function getResource(asset : entityframework.map.Asset) : any {
        if (!hasAsset(asset)) {
            return null;
        }

        return _resources[asset.type][asset.key];
    }

    export function createAssetDOMElement(asset : entityframework.map.Asset, baseSrc : string) : HTMLElement {
        var obj = null;
        var src = baseSrc;
        switch (asset.type) {
            case "TexturePNG":
                src += "/resources/" + asset.key + ".png";
                obj = new entityframework.map.PNGAsset(asset.key).createDOMElement(src);
                break;
        }
        return obj;
    }
}
