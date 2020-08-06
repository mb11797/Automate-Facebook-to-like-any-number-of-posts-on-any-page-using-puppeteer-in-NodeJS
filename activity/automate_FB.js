let fs = require("fs");
let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let pageName = process.argv[3];
let noOfPost = process.argv[4];

(async function(){
    let credentialFile = await fs.promises.readFile(cFile);
    let {user, password, url} = JSON.parse(credentialFile);
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"]
    });

    let tabs = await browser.pages();
    let tab = tabs[0];

    //normal => networkidle0
    // front end heavy => networkidle2
    await tab.goto(url, {waitUntil: "networkidle2"});
    // await tab.waitForSelector("input[class=inputtext _55r1 _6luy name=email]");
    // await tab.waitForSelector("input[type=text and name=email]");
    await tab.waitForSelector("input[id=email]");
    await tab.type("input[id=email]", user, {delay: 60});
    await tab.type("input[type=password]", password, {delay: 60});

    //click => cause navigation wrap in Promise.all
    // tab.click("input[type=submit]", {delay: 120})
    await Promise.all([
        tab.click("button[type=submit]", {delay: 60}),
        tab.waitForNavigation({waitUntil: "networkidle2"})
    ])

    // home (page
    // _1frb

    await tab.waitForSelector("._1frb");
    await tab.type("._1frb", pageName, {delay: 100});
    await tab.keyboard.press("Enter");
    await tab.waitForNavigation({waitUntil: "networkidle2"});

    //search page
    await tab.waitForSelector("li[data-edge=keywords_pages]");
    await Promise.all([
        tab.click("li[data-edge=keywords_pages] a"),
        tab.waitForNavigation({waitUntil: "networkidle2"})
    ]);

    await tab.waitForSelector("._1glk._6phc.img");
    await Promise.all([
        tab.waitForNavigation({waitUntil: "networkidle2"}),
        tab.click("._1glk._6phc.img")
    ]);

    //post tab => meaning full selector
    //click
    //data-edge="keywords_pages"

    // url changing twice => so 2 time waitfornavigation()
    await tab.waitForSelector("div[data-key=tab_posts]");
    await Promise.all([
        tab.click("div[data-key=tab_posts] a"),
        tab.waitForNavigation({waitUntil: "networkidle2"})
    ]);
    await tab.waitForNavigation({waitUntil: "networkidle2"});

    // // Method 1 - Like posts
    // // loader after every 7 posts
    // await tab.waitForNavigation({waitUntil: "networkidle2"});

    // await tab.waitForSelector("._6rk2.img.sp_X73jHqRLgmV.sx_ee9b30");
    // await tab.waitForSelector("._6rk2.img.sp_jYbuWjr2z89.sx_1ad5ea")
    // await tab.waitForSelector("._666k ._8c74")
    // let posts = await tab.$$("._666k ._8c74");
    // // let idx = 0;
    // for(let i=0; i<noOfPost; i++){
    //     // await tab.waitForSelector("._6rk2.img.sp_X73jHqRLgmV.sx_ee9b30");
    //     // await Promise.all([
    //     //     tab.click("._6rk2.img.sp_X73jHqRLgmV.sx_ee9b30")
    //     // ]);
    //     await Promise.all([
    //         tab.waitForNavigation({ waitUntil: "networkidle0" }),
    //         posts[i].click({delay: 40})
    //     ])
    // }

    // Method 2 - Like posts
    // loader after every 7 posts
    // 20 post => 7 before each loader
    let idx = 0;
    do{
        // all posts => request, time => page => element display
        // present => 1xnd => 7 posts
        // await tab.waitForSelector(".pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        // await tab.waitForSelector(".pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        // get all posts
        // let posts = await tab.$$(".pagelet_timeline_main_column ._1xnd>._4-u2._4-u8");
        // let cPost = posts[idx];
        // let likeBtn = await cPost.$("._666k ._8c74");
        // let likeBtn = await cPost.$("._666k ._8c74");
        // await tab.waitForSelector("._666k ._8c74 ._6a-y._3l2t._18vj");
        let likeBtn = await tab.$("._666k ._8c74 ._6a-y._3l2t._18vj");
        await likeBtn.click({delay: 120});

        //loader => data
        // await tab.waitForSelector(".uiMorePagerLoader.pam.uiBoxLightblue", {hidden: true});
        idx++;
    }while(idx<noOfPost);

})();
