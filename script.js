/* =========================================
   ELEMENTS
========================================= */

const openingScreen = document.getElementById("openingScreen");
const treeScreen = document.getElementById("treeScreen");
const mainScreen = document.getElementById("mainScreen");
const letterScreen = document.getElementById("letterScreen");

const startHeart = document.getElementById("startHeart");
const letterButton = document.getElementById("letterButton");
const closeLetter = document.getElementById("closeLetter");

const daysCount = document.getElementById("daysCount");

const typedLetter = document.getElementById("typedLetter");
const typingCursor = document.getElementById("typingCursor");

const photoViewer = document.getElementById("photoViewer");
const photoBackdrop = document.getElementById("photoBackdrop");
const closePhoto = document.getElementById("closePhoto");
const expandedPhoto = document.getElementById("expandedPhoto");

const photoCards = document.querySelectorAll(".photo-card");


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach((item) => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


/* =========================================
   DAYS SINCE WE MET
========================================= */

const firstMeeting = new Date(
    "2026-07-15T17:00:00+08:00"
);


function updateDays() {

    const now = new Date();

    const difference =
        now.getTime() -
        firstMeeting.getTime();

    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    const days =
        Math.max(
            0,
            Math.floor(
                difference / millisecondsPerDay
            )
        );

    daysCount.textContent =
        days.toLocaleString();
}


updateDays();


setInterval(
    updateDays,
    60 * 1000
);


/* =========================================
   OPENING HEART → TREE
========================================= */

startHeart.addEventListener(
    "click",
    () => {

        startHeart.disabled = true;

        showScreen(treeScreen);

        /*
         * The tree animation finishes at approximately
         * 8.15 seconds.
         *
         * We wait a little longer so the final hearts
         * can fully bloom before showing the main page.
         */

        setTimeout(
            () => {

                showScreen(mainScreen);

                startHeart.disabled = false;

            },
            9000
        );

    }
);


/* =========================================
   LETTER
========================================= */

letterButton.addEventListener(
    "click",
    () => {

        showScreen(letterScreen);

        /*
         * Reset the letter every time it is opened.
         */

        typedLetter.textContent = "";

        typingCursor.style.display =
            "inline-block";

        setTimeout(
            () => {
                typeLetter();
            },
            500
        );

    }
);


/* =========================================
   EXACT ORIGINAL LETTER
========================================= */

const letterText =
`Hii, My Wifeyyy...

How are you? I miss you so much, do you know that? I've been thinking about you the whole day, alam ko may ginagawa ka ngayon, I know you're busy pero I just want to tell you that you're hubby misses you so much. 

I'm sorry sa kanina po, medyo hindi ata maganda ang aking pagkakasabi, pero want ko lang po na makapag rest ka po, kasi masyado nang napagod ang katawan mo sa dami ng ginagawa mo. Kaya if you have time, remember to always get some rest, and wag kakalimutang kumain, bawal po ang nag papalipas ng gutom ahh. 

I really really want to talk with you right now, I miss you, I miss talking with you, I miss hugging you, I miss kissing you, I miss your voice, I miss your eyes, I miss your smile, I miss your presence, I miss everything about you. I hope we can talk again, and I hope you have a complete rest na po.

Don't worry, while you were gone, all I did was, watch and play, I did nothing else other than that. Your hubby is longing for your presence po, I want your attention na po, engkkk, attention seeker yarn? Pero yes, I'm craving your attention po, pero later pag natapos ka po mag rest ka po muna ah. I hope this helps you relieve some stress, I hope this helps po para sa pagod mo, I really really love youu, My asawaaa. Always remember na, there is someone waiting for you, and that's me. I will keep on waiting no matter how long, just don't forget you have me. I'll keep on waiting for you, talk with you later, I love youuu, mwaa mwaa mwaa.

This is from your boyfriend, Ceddiee`;


/* =========================================
   TYPING ANIMATION
========================================= */

let typingActive = false;


function typeLetter() {

    if (typingActive) {
        return;
    }

    typingActive = true;

    let index = 0;

    function typeNextCharacter() {

        if (index >= letterText.length) {

            typingActive = false;

            setTimeout(
                () => {
                    typingCursor.style.display =
                        "none";
                },
                1500
            );

            return;
        }


        const character =
            letterText[index];

        typedLetter.textContent +=
            character;

        index++;


        let delay = 28;


        /*
         * Slightly slower pauses make the
         * typing feel more natural.
         */

        if (character === ".") {
            delay = 220;
        }

        else if (character === ",") {
            delay = 120;
        }

        else if (character === "?") {
            delay = 250;
        }

        else if (character === "!") {
            delay = 250;
        }

        else if (character === "\n") {
            delay = 350;
        }


        /*
         * Random tiny variation so the
         * animation doesn't feel robotic.
         */

        const variation =
            Math.floor(
                Math.random() * 12
            );

        setTimeout(
            typeNextCharacter,
            delay + variation
        );
    }


    typeNextCharacter();
}


/* =========================================
   CLOSE LETTER
========================================= */

closeLetter.addEventListener(
    "click",
    () => {

        typingActive = false;

        showScreen(mainScreen);

    }
);


/* =========================================
   PHOTO VIEWER
========================================= */

function openPhoto(imagePath) {

    expandedPhoto.src =
        imagePath;

    photoViewer.classList.add(
        "active"
    );

    photoViewer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closePhotoViewer() {

    photoViewer.classList.remove(
        "active"
    );

    photoViewer.setAttribute(
        "aria-hidden",
        "true"
    );

    expandedPhoto.src = "";

    document.body.style.overflow =
        "hidden";
}


/* =========================================
   PHOTO BUTTONS
========================================= */

photoCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                const imagePath =
                    card.dataset.photo;

                openPhoto(imagePath);

            }
        );

    }
);


/* =========================================
   PHOTO VIEWER CLOSE
========================================= */

closePhoto.addEventListener(
    "click",
    closePhotoViewer
);


photoBackdrop.addEventListener(
    "click",
    closePhotoViewer
);


/*
 * Clicking the enlarged photo also closes it.
 */

expandedPhoto.addEventListener(
    "click",
    closePhotoViewer
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            if (
                photoViewer.classList.contains(
                    "active"
                )
            ) {

                closePhotoViewer();

                return;
            }


            if (
                letterScreen.classList.contains(
                    "active"
                )
            ) {

                typingActive = false;

                showScreen(
                    mainScreen
                );

            }

        }

    }
);


/* =========================================
   PREVENT TOUCH SCROLL ON CLOSED SCREENS
========================================= */

document.addEventListener(
    "touchmove",
    (event) => {

        const photoIsOpen =
            photoViewer.classList.contains(
                "active"
            );

        const letterIsOpen =
            letterScreen.classList.contains(
                "active"
            );

        if (
            !photoIsOpen &&
            !letterIsOpen
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);
