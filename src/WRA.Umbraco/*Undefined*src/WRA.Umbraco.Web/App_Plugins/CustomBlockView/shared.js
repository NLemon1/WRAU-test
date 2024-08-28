
//Set Block Width (Block Composition)
const getSetWidth = (scopeObject) => {

    const width = scopeObject.block.data.width[0];
    let finalWidth = "";

    if (width) {
        switch (width) {
            case "1128px":
                finalWidth += ' container';
                break;
            case "1920px":
                finalWidth += ' container container--lg';
                break;
            case "Full":
                finalWidth += "w-100";
                break;
        }
    }
         
    return finalWidth;
} 

//Headline
