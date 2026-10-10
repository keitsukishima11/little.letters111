/* --------------------------------------------------
   LETTER CONTENT
-------------------------------------------------- */

const letters = {

    reminder: {
        title: "Just a Little Reminder",

        text: `
            <p>Dear Karpi,</p>

            <p>You're genuinely such a good person, and I really like the kind of personality you have. There's something about your presence that just makes things feel a little better. Even just seeing you around somehow puts me in a good mood, and I don't think you realize how nice that is.</p>

            <p>Honestly, I feel pretty blessed that I got to come across you in the first place. Ever since the day I first saw you, there's just been something about you that I've always found really special.</p>

            <p>You've been doing good, even if you don't always feel like you are. So give yourself a little more credit sometimes, okay?</p>

            <p>You deserve to see the good in yourself too.</p>

            <p class="signature">With love,<br>Sumit</p>
        `
    },


    littleThings: {
        title: "Just So You Know",

        text: `
            <p>Dear Karpi,</p>

            <p>You can always talk to me comfortably. You don't have to think too much about what to say or worry about being judged. Just be yourself.</p>

            <p>I might not always have the right words or know what to say, but I'll always be happy to listen.</p>

            <p>You're such a good person, and I genuinely hope you know that. You deserve to have people around you who appreciate you for who you are.</p>

            <p>So whenever you feel like talking, you know where to find me.</p>

            <p class="signature">With love,<br>Sumit</p>
        `
    },


    heart: {
        title: "Keep Going",

        text: `
            <p>Dear Karpi,</p>

            <p>I know things don't always go exactly the way we want them to, but I hope you keep going and keep believing in yourself.</p>

            <p>You've come this far, and that's something worth being proud of. Whatever you're working towards, I hope you get there at your own pace and never feel like you're behind.</p>

            <p>And whenever things get a little difficult, I hope you remember that you don't have to handle everything alone. There are people who genuinely care about you.</p>

            <p>Keep being the person you are, keep doing your best, and don't forget to take care of yourself along the way.</p>

            <p>And honestly, I hope I get to know you more as time goes on. I think that'd be pretty nice.</p>

            <p class="signature">With love,<br>Sumit</p>
        `
    }

};


/* --------------------------------------------------
   ELEMENTS
-------------------------------------------------- */

const mailbox =
    document.getElementById("mailbox");

const lettersArea =
    document.getElementById("lettersArea");

const instruction =
    document.getElementById("instruction");

const overlay =
    document.getElementById("letterOverlay");

const closeLetter =
    document.getElementById("closeLetter");

const letterHeading =
    document.getElementById("letterHeading");

const letterBody =
    document.getElementById("letterBody");

const envelopes =
    document.querySelectorAll(".envelope");


/* --------------------------------------------------
   STATE
-------------------------------------------------- */

let mailboxOpened = false;

let selectedLetter = false;


/* --------------------------------------------------
   OPEN MAILBOX
-------------------------------------------------- */

mailbox.addEventListener("click", () => {

    if (mailboxOpened) return;

    mailboxOpened = true;

    mailbox.classList.add("open");

    mailbox.classList.add("shake");


    setTimeout(() => {

        mailbox.classList.remove("shake");

    }, 700);


    instruction.innerHTML =
        "There are three letters inside.<br><strong>You can only choose one.</strong>";


    setTimeout(() => {

        lettersArea.classList.add("visible");


        envelopes.forEach(
            (envelope, index) => {

                setTimeout(() => {

                    envelope.classList.add("pop");

                }, index * 130);

            }
        );

    }, 550);

});


/* --------------------------------------------------
   OPEN LETTER
-------------------------------------------------- */

envelopes.forEach(
    envelope => {

        envelope.addEventListener(
            "click",
            () => {

                if (selectedLetter) return;

                selectedLetter = true;


                const key =
                    envelope.dataset.letter;

                const letter =
                    letters[key];


                letterHeading.textContent =
                    letter.title;

                letterBody.innerHTML =
                    letter.text;


                envelope.classList.add(
                    "selected"
                );


                envelopes.forEach(
                    other => {

                        if (other !== envelope) {

                            other.classList.add(
                                "locked"
                            );

                        }

                    }
                );


                setTimeout(() => {

                    overlay.classList.add(
                        "open"
                    );

                }, 200);

            }
        );

    }
);


/* --------------------------------------------------
   CLOSE LETTER
-------------------------------------------------- */

closeLetter.addEventListener(
    "click",
    () => {

        overlay.classList.remove(
            "open"
        );

    }
);


overlay.addEventListener(
    "click",
    event => {

        if (event.target === overlay) {

            overlay.classList.remove(
                "open"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            overlay.classList.remove(
                "open"
            );

        }

    }
);


/* --------------------------------------------------
   FLOATING PETALS
-------------------------------------------------- */

function createPetal() {

    const petal =
        document.createElement("div");


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "vw";


    petal.style.top =
        "-20px";


    const colors = [

        "#e9b9bf",

        "#c7d9e4",

        "#e8d99d",

        "#cbd9c1",

        "#d0c6df"

    ];


    petal.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    petal.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    document.body.appendChild(
        petal
    );


    requestAnimationFrame(() => {

        petal.classList.add(
            "active"
        );

    });


    setTimeout(() => {

        petal.remove();

    }, 7500);

}


/* occasional petals */

setInterval(() => {

    if (
        document.visibilityState ===
        "visible"
    ) {

        createPetal();

    }

}, 2600);


/* --------------------------------------------------
   LITTLE MAILBOX BOUNCE
-------------------------------------------------- */

setInterval(() => {

    if (
        !mailboxOpened &&
        document.visibilityState ===
        "visible"
    ) {

        mailbox.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)"
                },

                {
                    transform:
                        "translateY(-4px) rotate(-1deg)"
                },

                {
                    transform:
                        "translateY(0) rotate(0deg)"
                }
            ],

            {
                duration: 900,

                easing:
                    "ease-in-out"
            }

        );

    }

}, 6000);
