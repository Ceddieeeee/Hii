/* =====================================================
   ELEMENTS
===================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const treeScreen =
    document.getElementById("treeScreen");

const mainScreen =
    document.getElementById("mainScreen");

const startHeart =
    document.getElementById("startHeart");

const letterButton =
    document.getElementById("letterButton");

const letterScreen =
    document.getElementById("letterScreen");

const closeLetter =
    document.getElementById("closeLetter");

const daysCount =
    document.getElementById("daysCount");

const typedLetter =
    document.getElementById("typedLetter");

const typingCursor =
    document.getElementById("typingCursor");


/* =====================================================
   PHOTO VIEWER ELEMENTS
===================================================== */

const photoViewer =
    document.getElementById("photoViewer");

const expandedPhoto =
    document.getElementById("expandedPhoto");

const closePhoto =
    document.getElementById("closePhoto");

const photoViewerBackdrop =
    document.querySelector(
        ".photo-viewer-backdrop"
    );

const photoCards =
    document.querySelectorAll(
        ".photo-card"
    );


/* =====================================================
   FIRST MEETING
===================================================== */

/*
   July 15, 2026
   5:00 PM
   Philippine Standard Time (UTC+8)
*/

const firstMeeting =
    new Date(
        "2026-07-15T17:00:00+08:00"
    );


/* =====================================================
   LETTER
===================================================== */

/*
   Replace this with your actual letter.
*/

const letterText = `I still think about the day we first met.

July 15, 2026 became a special date to me because it was the beginning of something I never knew I would treasure this much.

Since then, every little moment with you has become something I want to keep.

Your smile, your voice, the way you make me feel comfortable, and even the little things you probably don't realize you do mean more to me than I can explain.

I know I am not perfect. There are times when I become quiet, distant, or difficult to understand. But with you, I learned how to open up and let someone see the parts of me that I usually keep hidden.

And if I could choose again, in every lifetime, I think I would still choose you.

Thank you for being you.

Thank you for every memory we've made and every memory we're still going to make.

Here's to us, and to everything that is still waiting for us.

I love you. ♡`;


/* =====================================================
   TYPING VARIABLES
===================================================== */

let typingTimeout = null;

let typingIndex = 0;


/* =====================================================
   START TREE
===================================================== */

startHeart.addEventListener(
    "click",
    () => {

        /*
           Hide opening.
        */

        openingScreen.classList.remove(
            "active"
        );


        /*
           Show tree.
        */

        setTimeout(
            () => {

                treeScreen.classList.add(
                    "active"
                );

            },
            500
        );


        /*
           Tree animation:

           Branches:
           ~0 - 4.9 sec

           Hearts:
           ~3 - 8.2 sec

           Finished:
           ~7.8 sec

           Then transition.
        */

        setTimeout(
            () => {

                treeScreen.classList.remove(
                    "active"
                );


                setTimeout(
                    () => {

                        mainScreen.classList.add(
                            "active"
                        );

                    },
                    900
                );

            },
            9200
        );

    }
);


/* =====================================================
   DAYS SINCE WE MET
===================================================== */

function updateDays() {

    const now =
        new Date();

    const difference =
        now.getTime() -
        firstMeeting.getTime();


    const days =
        Math.floor(
            difference /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    daysCount.textContent =
        Math.max(
            0,
            days
        );
}


/*
   Run immediately.
*/

updateDays();


/*
   Keep the number updated.
*/

setInterval(
    updateDays,
    60000
);


/* =====================================================
   OPEN LETTER
===================================================== */

letterButton.addEventListener(
    "click",
    () => {

        letterScreen.classList.add(
            "open"
        );


        /*
           Reset letter.
        */

        typedLetter.textContent = "";

        typingCursor.style.display =
            "inline-block";


        /*
           Start typing after
           opening animation.
        */

        setTimeout(
            () => {

                typeLetter();

            },
            700
        );

    }
);


/* =====================================================
   CLOSE LETTER
===================================================== */

function closeLetterWindow() {

    letterScreen.classList.remove(
        "open"
    );

    clearTimeout(
        typingTimeout
    );
}


closeLetter.addEventListener(
    "click",
    closeLetterWindow
);


document
    .querySelector(".letter-overlay")
    .addEventListener(
        "click",
        closeLetterWindow
    );


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLetterWindow();

            closePhotoViewer();

        }

    }
);


/* =====================================================
   TYPING ANIMATION
===================================================== */

function typeLetter() {

    typingIndex = 0;

    typedLetter.textContent = "";


    function typeNextCharacter() {

        /*
           Stop if the letter was closed.
        */

        if (
            !letterScreen.classList.contains(
                "open"
            )
        ) {

            return;

        }


        /*
           Finished.
        */

        if (
            typingIndex >=
            letterText.length
        ) {

            typingCursor.style.display =
                "none";

            return;

        }


        /*
           Add next character.
        */

        const currentCharacter =
            letterText.charAt(
                typingIndex
            );


        typedLetter.textContent +=
            currentCharacter;


        typingIndex++;


        /*
           Natural typing speeds.
        */

        let typingSpeed = 28;


        if (
            currentCharacter === "."
        ) {

            typingSpeed = 250;

        }


        if (
            currentCharacter === ","
        ) {

            typingSpeed = 120;

        }


        if (
            currentCharacter === "\n"
        ) {

            typingSpeed = 350;

        }


        typingTimeout =
            setTimeout(
                typeNextCharacter,
                typingSpeed
            );

    }


    typeNextCharacter();
}


/* =====================================================
   PHOTO EXPANSION
===================================================== */

photoCards.forEach(
    (photo) => {

        photo.addEventListener(
            "click",
            () => {

                const imagePath =
                    photo.dataset.photo;


                expandedPhoto.src =
                    imagePath;


                photoViewer.classList.add(
                    "open"
                );


                /*
                   Prevent background
                   scrolling.
                */

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* =====================================================
   CLOSE PHOTO
===================================================== */

function closePhotoViewer() {

    photoViewer.classList.remove(
        "open"
    );


    setTimeout(
        () => {

            expandedPhoto.src = "";

        },
        300
    );


    /*
       Restore normal state.
    */

    if (
        !letterScreen.classList.contains(
            "open"
        )
    ) {

        document.body.style.overflow =
            "hidden";

    }

}


closePhoto.addEventListener(
    "click",
    closePhotoViewer
);


/*
   Clicking the dark background
   also closes the photo.
*/

photoViewerBackdrop.addEventListener(
    "click",
    closePhotoViewer
);


/*
   Clicking the expanded image
   closes it too.
*/

expandedPhoto.addEventListener(
    "click",
    closePhotoViewer
);


/* =====================================================
   PREVENT BACKGROUND TOUCH SCROLLING
===================================================== */

document.addEventListener(
    "touchmove",
    (event) => {

        /*
           Don't allow the page behind
           the letter/photo viewer to move.
        */

        if (
            !letterScreen.classList.contains(
                "open"
            )
            &&
            !photoViewer.classList.contains(
                "open"
            )
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);