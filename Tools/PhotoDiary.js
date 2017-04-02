var target = UIATarget.localTarget();
var app = target.frontMostApp();
var runs = 20;
var delay = 2;

UIALogger.logStart("[+] Element tree");
UIATarget.localTarget().logElementTree();
UIALogger.logPass();

UIATarget.localTarget().captureScreenWithName("Start");

for(mainLoop=0; mainLoop < runs; mainLoop++){
    // create entry text
    var theEntryText = createString();
    // add entry
    app.navigationBar().rightButton().tap();
    // add image from camera roll
    app.toolbar().buttons()["Bookmarks"].tap();
    UIATarget.localTarget().captureScreenWithName("Library");

    if (app.alert().isValid() && app.alert().isVisible) {
        var button = app.alert().buttons()["OK"];
        if (button.isValid()) {
            button.tap();
        }
    }
    // choose album
    UIATarget.localTarget().captureScreenWithName("Albums");
    app.mainWindow().tableViews()[0].cells()[0].tap();
    // chose random image
    UIATarget.localTarget().captureScreenWithName("Images");
    app.mainWindow().collectionViews()[0].cells()[getRandomInt(0,10)].tap();
    // confirm image
    UIATarget.localTarget().delay(1);
    app.mainWindow().logElementTree();
    var theButton = target.frontMostApp().mainWindow().buttons()[2];
    var x = theButton.rect().origin.x + 1;
    var y = theButton.rect().origin.y + 1;
    target.tap({x:x, y:y});
    UIATarget.localTarget().delay(1);
    //    app.mainWindow().logElementTree();
    //       UIATarget.localTarget().captureScreenWithName(theEntryText);
    
    // active textview
    app.mainWindow().textViews()[0].tap();
    // enter random text
    app.keyboard().typeString(theEntryText);
    UIATarget.localTarget().captureScreenWithName("Text");
    // save text
    app.windows()[2].toolbar().buttons()["Save"].tap();
    // save entry
    app.mainWindow().images()[0].tapWithOptions({tapOffset:{x:0.40, y:0.40}});
    // return to list
    app.navigationBar().leftButton().tap();
}

function createString() {
    var theText = "";
    var theCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    for( var i=0; i < 20; i++ )
        theText += theCharset.charAt(Math.floor(Math.random() * theCharset.length));
    return theText;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
