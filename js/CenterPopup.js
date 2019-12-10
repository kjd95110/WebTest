function CenterPopup(mypage, myname, width, height, features) {
    LeftPosition = (screen.width) ? (screen.width - width) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - height) / 2 : 0;
    settings = "width=" + width + ",height=" + height + ",top=" + TopPosition + ",left=" + LeftPosition + "," + features;
    var win = window.open(mypage, myname, settings);
    return win;
}