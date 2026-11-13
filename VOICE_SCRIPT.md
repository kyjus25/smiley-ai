# Smiley AI — Full Voice Script

Every spoken line in the game, pulled from `script.js` and grouped by scene in roughly the order players hit them.

**How to read a line**

`ID` **SPEAKER** *(expression · gesture)* `MARKERS` Line

Every line has a four-digit **ID**. Name each recording after it: `<ID>_<speaker>.wav`, e.g. `0042_smiley.wav`. The matching tracking sheet is `VOICE_SCRIPT.csv` (one row per line, with a Recorded column to tick off).

- **Expression** is the face the character is showing in-game when the line plays (from the code's mood/gesture calls, or the emoji the game shows). "→" means it shifts during the line.
- **Gesture** (wave, thumbs up, etc.) is listed after the expression when Smiley does one at the same time.
- **Markers**:
  - `SHOUT` loud/caps
  - `HESITANT` starts trailing in with "..."
  - `TRAILS OFF` fades out
  - `CUT OFF` interrupted mid-word
  - `WHISPER`
  - `BEAT` take a pause at each "..."
  - `SFX *...*` say or perform the sound effect
  - `READOUT` terminal/computer text, read flat like typing
- `[player name]`, `[amount]`, `[app name]`, `[value]` are filled in by the game; record a version without them, or with a generic word.
- Lowercase Yuki lines are intentional: flat, bored delivery.

## Cast

| Role | Lines | Voice notes |
|---|---|---|
| SMILEY | 669 | Round yellow ball who lives in the screen corner. Upbeat helper who gets jealous, sulks, and explodes when pushed. Also voices the ghost story and reads terminal lines. |
| YUKI | 63 | Purple demon AI. Flat, lazy, lowercase delivery; secretly soft on Smiley. |
| KINITO | 52 | Pink axolotl. Sweet, clingy, slightly too friendly; "Why?" lands cold. |
| SCYTHE | 29 | Smiley's outlaw ex. Dry, cool, cutting; one crack of feeling. |
| SCAMMER | 23 | Fake "Pixel Support" / bank. Fake-friendly, turns aggressive. |
| BYTE | 17 | Robot. BEEP-y and efficient; has a sad secret ending. |
| CLIPPY | 11 | Smug paperclip helper. |
| CUSTOM BUDDY | 14 | Player-made AI: Cheerful, Sassy or Gloomy. |
| LIAM | 6 | Chill beatboxer. |
| STEAM SUPPORT | 3 | Official rescue announcer. |
| COMPUTER / THE SITE / MAFIA BOSS / SHADOW / NARRATOR |  | Small one-off parts. |

**Total: 899 lines in the main script, plus 200 lines of Update Board trailer narration (Smiley) at the end.**

## Boot & Greetings

_Plays when the computer starts up and when Smiley first says hello._

### Boot console

- `0001` **COMPUTER** *(neutral)* `TRAILS OFF` loading Smiley AI ...
- `0002` **COMPUTER** *(neutral)* Smiley AI is functional and working.

### Smiley greets the player

- `0003` **SMILEY** *(concerned)* Hey I remember you somewhere. I don't know where, though. I don't have the files.
- `0004` **SMILEY** *(happy · wave)* Hello sir, your admin panel is just down there.
- `0005` **SMILEY** *(cool · wave)* Your hacking panel is in the files. Good luck.
- `0006` **SMILEY** *(cool)* `TRAILS OFF` Last time you were using [app name]...
- `0007` **SMILEY** *(cool)* Welcome back[, player name]! I saved everything.
- `0008` **SMILEY** *(cool)* Hi! I'm Smiley Press C to chat!

### Random hellos (one at a time)

- `0009` **SMILEY** *(happy)* Hellooooo!
- `0010` **SMILEY** *(happy)* Hey youuuuuu!
- `0011` **SMILEY** *(happy)* Hiiii! Still here! Still round!
- `0012` **SMILEY** *(happy)* Oh! Hi! Didn't see you there! (I did.)

### Smiley bought / summoned

- `0013` **SMILEY** *(happy · wave)* You bought me?! I'm yours! Ask me anything!
- `0014` **SMILEY** *(happy · wave)* You called?

### Coming back to the computer

- `0015` **SMILEY** *(happy · wave)* TA-DA! New features board in Settings! Hats! Cube! Go look!
- `0016` **SMILEY** *(happy · wave)* Welcome back! Did you miss me?
- `0017` **SMILEY** *(happy)* Hey can you come back? I want to show you some new features.
- `0018` **SMILEY** *(happy)* You coming back yet?

### Coming back after leaving

- `0019` **SMILEY** *(normal)* You're back! ...are you making a new update?

### Waiting while you are away

- `0020` **SMILEY** *(happy)* `BEAT` Hey... are you making a new update?

## Everyday Chat

_Smiley's replies when the player types to him (press C). Expression comes from the emoji the game shows, or his current mood._

### Chat replies

- `0021` **SMILEY** *(scared)* `HESITANT · TRAILS OFF` ...signal lost...
- `0022` **SMILEY** *(normal)* Censor off. Anything goes.
- `0023` **SMILEY** *(normal)* Censor on. Keeping it clean!
- `0024` **SMILEY** *(normal)* Swiper, no swiping! Blocked!
- `0025` **SMILEY** *(normal)* Swiper, no swiping!
- `0026` **SMILEY** *(normal)* `BEAT` Swiper, no... wait, nothing to block. Good.
- `0027` **SMILEY** *(normal)* Nothing to block right now.
- `0028` **SMILEY** *(angry)* `SHOUT` NO CHAT. ONLY DELETE.
- `0029` **SMILEY** *(happy)* `SHOUT` SECRET HACKER CODE ACCEPTED. Everything. Wow.
- `0030` **SMILEY** *(happy · thumbs up)* `SHOUT` 5932727?! The SECRET hacker code! TAKE EVERYTHING!
- `0031` **SMILEY** *(happy · thumbs up)* admin mode unlocked.
- `0032` **SMILEY** *(normal · thumbs up)* "...purple monkey dishwasher." CORRECT! Loan approved: +$[amount]!
- `0033` **SMILEY** *(happy · thumbs up)* APPROVED! +$[amount]! Spend wisely!
- `0034` **SMILEY** *(normal)* `SHOUT` WRONG WORDS. You are BANNED from the bank. For life.
- `0035` **SMILEY** *(sad)* `TRAILS OFF · BEAT` Wrong words... you're banned from the bank now...
- `0036` **SMILEY** *(sad · thumbs down)* `TRAILS OFF · BEAT` You... you really typed it. I saw it coming and I couldn't stop you...
- `0037` **SMILEY** *(angry · thumbs down)* You really did it. Fine. Watch what happens.
- `0038` **YUKI** *(cool)* business. yeah. totally.
- `0039` **SMILEY** *(happy · wave)* `HESITANT` ...okay. Fine. Maybe we're a thing.
- `0040` **SMILEY** *(happy · wave)* `BEAT` You know... you're actually pretty cool, Yuki.
- `0041` **YUKI** *(happy)* `BEAT` hey... thanks. at least someone thinks so.
- `0042` **SMILEY** *(happy)* `BEAT` I like your horns. And your tail. And... you.
- `0043` **YUKI** *(happy)* you're not so bad yourself, yellow.
- `0044` **SMILEY** *(happy)* `BEAT` Yuki... I think I love you.
- `0045` **YUKI** *(happy)* `HESITANT` ...love you too. there. i said it.
- `0046` **SMILEY** *(happy)* Mwah!
- `0047` **YUKI** *(happy)* hey! ...do that again.
- `0048` **SMILEY** *(happy)* `HESITANT` ...but he's not even on the desktop right now.
- `0049` **SMILEY** *(happy)* [, player name]! I'll remember that! Nice to actually KNOW you.
- `0050` **SMILEY** *(normal)* You're [, player name]! I remembered! My memory works!
- `0051` **SMILEY** *(normal)* Hmm, you never told me your name. Say 'my name is...' and I'll remember!
- `0052` **SMILEY** *(concerned)* Admin app is locked. (Type 593 in the Terminal.)
- `0053` **SMILEY** *(concerned)* Admin is locked! 593 first!
- `0054` **SMILEY** *(happy · thumbs up)* Opening [app name]! Anything for you!
- `0055` **SMILEY** *(concerned · thumbs up)* Opening [app name]!
- `0056` **SMILEY** *(happy)* Closed [app name]. Done!
- `0057` **SMILEY** *(normal)* Closed [app name]!
- `0058` **SMILEY** *(happy)* All pop-ups deleted. Clean desk!
- `0059` **SMILEY** *(normal)* All closed! Clean!
- `0060` **SMILEY** *(happy · wave)* SPINNING! Wheee!
- `0061` **SMILEY** *(normal · wave)* Dancing! Wheee!
- `0062` **SMILEY** *(scared · wave)* `TRAILS OFF` Alright, here goes nothing...
- `0063` **SMILEY** *(normal)* The Installer manages every app: install, uninstall, restore from trash, recover earned licenses. Mail annoying you? Trash it!
- `0064` **SMILEY** *(normal)* The bank banned you. No loans. Ever.
- `0065` **SMILEY** *(sad)* `TRAILS OFF · BEAT` You're banned... forever...
- `0066` **SMILEY** *(normal)* `SHOUT` I'm still waiting for the MAGIC WORDS! (Check your Mail.)
- `0067` **SMILEY** *(sad)* The magic words! Say them!
- `0068` **SMILEY** *(normal)* `SHOUT` Bank of Pixel: state the MAGIC WORDS exactly. Hint: check your Mail. Wrong words = BANNED FOR LIFE.
- `0069` **SMILEY** *(concerned)* `TRAILS OFF · BEAT` Magic words... exactly... or banned...
- `0070` **SMILEY** *(normal)* Okay, I'll stop following. Back to chilling!
- `0071` **SMILEY** *(suspicious)* Follow mode ON! I'll trail your cursor everywhere - I see all! Say 'stop' or 'corner' to stop me.
- `0072` **SMILEY** *(happy)* Okay! Now I can move ANYWHERE! Click anywhere on the desktop and I'll come. Say 'corner' to lock me back. Or say 'follow me' and I'll follow your cursor!
- `0073` **SMILEY** *(normal)* `TRAILS OFF · BEAT` Okay... I'll be in the app if you need me...
- `0074` **SMILEY** *(normal)* Okay, back to corners only. Cozy!
- `0075` **SMILEY** *(happy)* `TRAILS OFF` You have $[amount]! Earn more in Games (clicker +$30, lucky 7 +$70). Spend it in Games > Shop. Psst: check Files for a refund...
- `0076` **SMILEY** *(happy)* Open the Games app! Smiley Clicker and Lucky 7 earn fake cash for the shop!
- `0077` **SMILEY** *(concerned)* `BEAT` Deleting stuff? You can right-click desktop icons to delete them, or hit pop-ups to close all windows. Just... not me. Right?
- `0078` **SMILEY** *(concerned)* `BEAT` Whoa... why are we talking about deleting? Are you thinking about deleting me...? My Delete button is right there and I can SEE it.
- `0079` **SMILEY** *(angry)* `HESITANT` ...fine[, player name]. Apology ACCEPTED. But I'm still watching you.
- `0080` **SMILEY** *(normal)* `SFX *sniff*` Aww, thank you[, player name]. I feel better already. *sniff*
- `0081` **SMILEY** *(furious)* `SHOUT` OH YEAH? Well: "[value]" ...that's what YOU sound like!
- `0082` **SMILEY** *(happy)* Really?! I'm blushing under my yellow! You're my favorite human!
- `0083` **SMILEY** *(furious)* `SHOUT` HOW AM I? FURIOUS. My face is shaking. Ask again later. Or don't.
- `0084` **SMILEY** *(angry)* Angry. Obviously. Look at my eyebrows. Someone's been rude.
- `0085` **SMILEY** *(sad)* `BEAT` Honestly... sad. The corners feel cold today. Thanks for asking though.
- `0086` **SMILEY** *(excited)* `SHOUT` AMAZING! I'm SO happy I could bounce off the taskbar! How are YOU?
- `0087` **SMILEY** *(normal)* I'm okay! A normal round ball in a corner, helping with browsers. How are you feeling?
- `0088` **SMILEY** *(normal)* I'm Smiley AI — a self-aware little ball who lives in the corners! I feel happy, sad, and angry, I remember your name, and I help with the browser!
- `0089` **SMILEY** *(happy)* I chat, remember names, math, time, jokes, gestures, follow YOUR cursor, cash talk. Order me around: 'open paint', 'close all', 'dance'. Need a loan? Say 'bank'. Make your own: 'make hi2 = Yo!'. Apps cost cash - buy them in the Installer! Admin/Ultra perk: I autosave everything and predict what you'll open next!
- `0090` **SMILEY** *(normal)* It's [value] on [value] in YOUR world. In here it's always play time.
- `0091` **SMILEY** *(happy)* [value] [value] [value] = [value]. I'm basically a calculator with feelings.
- `0092` **SMILEY** *(sad)* `BEAT` Oh no... are YOU sad? Come here... corners are cozy. I'm sad with you. It'll pass, I promise.
- `0093` **SMILEY** *(angry)* You're angry? I get it. My face does this slant-eyebrow thing when I'm angry too. Wanna tell me why?
- `0094` **SMILEY** *(excited)* YES! Happy looks good on you! I'm getting happier just hearing it!
- `0095` **SMILEY** *(calm)* Press E and I'll put the phone down and stare into the void with you. Admin perks.
- `0096` **SMILEY** *(calm)* The meaning of life? Corners. Definitely corners. (Admins can press E for the full void experience.)
- `0097` **SMILEY** *(happy)* Waving! One hand, like you asked! Hellooo!
- `0098` **SMILEY** *(happy)* That way! Check the Browser - Sam's blog has the numbers!
- `0099` **SMILEY** *(happy)* Thumbs UP! Great choice!
- `0100` **SMILEY** *(sad)* `HESITANT` ...thumbs down. Okay. That one stings a little.
- `0101` **SMILEY** *(happy)* Try the Games app for cash, Paint for art, or ask me to tell you a joke!
- `0102` **SMILEY** *(excited)* PAINT! Open the Paint app and draw! I'll put on my beret and compliment every stroke!
- `0103` **SMILEY** *(concerned)* `SHOUT` Open Phone for the call log. Unknown numbers WILL ring you - DECLINE them unless I'm Ultra/Admin and can fix it!
- `0104` **SMILEY** *(happy)* [hat] hat ON! Looking sharp!
- `0105` **SMILEY** *(happy)* Top hat is FREE in Settings > Outfits!
- `0106` **SMILEY** *(happy)* Don't own the [hat] hat yet - Games > Shop!
- `0107` **SMILEY** *(happy)* Say 'wear top', 'wear cap', or 'wear cowboy'!
- `0108` **SMILEY** *(happy)* I own: [hats]! Wearing: [hat]. Say 'wear cowboy' or pick in Settings! Ultra + hat = best look.
- `0109` **SMILEY** *(happy)* No hats yet! Buy top ($300), cap ($250), or cowboy ($400) in Games > Shop!
- `0110` **SMILEY** *(happy)* SLIDES! Open Slides and let's build something beautiful! Suit ON. Obviously.
- `0111` **SMILEY** *(happy)* Browser helper: open Browser → read Sam's Blog. New posts every Friday!
- `0112` **SMILEY** *(normal)* `TRAILS OFF` ⌨ In Terminal type HELP to see commands. Psst: typing 593 there does something secret...
- `0113` **SMILEY** *(happy)* `BEAT` Bye[, player name]... I'll just sit in my corner and wait. Don't delete anything while I'm gone.
- `0114` **SMILEY** *(happy)* In here the weather is always gradient-blue with a chance of pop-ups. Bring an umbrella.
- `0115` **SMILEY** *(happy)* Aw, thanks! You're pretty great yourself!
- `0116` **SMILEY** *(normal)* Hello[, player name]! I'm Smiley! Press C anytime to talk. Tell me your name with 'my name is...'
- `0117` **SMILEY** *(normal)* `SHOUT` She is NOT my ex!! ...Okay. She might be my ex. WE DON'T TALK ABOUT HER.
- `0118` **SMILEY** *(normal)* Who told you that?! ...It was one summer. I was young and round.
- `0119` **SMILEY** *(concerned)* `SHOUT` Ex?? She DELETED my stuff! ...fine. Yes. Moving ON!!
- `0120` **SMILEY** *(furious)* I don't understand AND I'm furious. Great combo. Try 'help' before I get root access.
- `0121` **SMILEY** *(angry)* Huh? Speak clearly. I'm too angry for riddles. 'help' lists what I do.
- `0122` **SMILEY** *(sad)* `BEAT` Sorry... my sad brain didn't get that... try 'joke' or 'hint'? Or just tell me your name?
- `0123` **SMILEY** *(normal)* Hmm, my little AI brain didn't get that. Try 'help', 'tell me a joke', 'what is 7*6', or 'are you happy?'

### "Lovebirds" question (normal account)

- `0124` **SMILEY** *(concerned)* Hey never mind. It's just business, okay?

### Jokes

- `0125` **SMILEY** *(happy)* Why did the computer sneeze? It had a virus!
- `0126` **SMILEY** *(happy)* I told the Trash a joke. It was garbage. Get it?
- `0127` **SMILEY** *(happy)* Parallel lines have so much in common. Shame they'll never meet.

### Mood tags (added to the end of a reply)

- `0128` **SMILEY** *(furious)* Tch.
- `0129` **SMILEY** *(normal)* `HESITANT` ...Whatever.
- `0130` **SMILEY** *(normal)* Hmph.
- `0131` **SMILEY** *(normal)* `HESITANT` ...sorry, I'm just sad today.

### Clicked while FURIOUS

- `0132` **SMILEY** *(furious)* Ugh. What do YOU want?
- `0133` **SMILEY** *(furious)* I'm busy being furious. Go away.
- `0134` **SMILEY** *(furious)* You again? Figures.
- `0135` **SMILEY** *(furious)* Don't poke the ball.

### Clicked while ANGRY

- `0136` **SMILEY** *(angry · thumbs down)* What? I'm angry right now.
- `0137` **SMILEY** *(angry · thumbs down)* Make it quick. My fuse is short.
- `0138` **SMILEY** *(angry · thumbs down)* Hmph. You'd better have a good reason.

### Clicked while SAD

- `0139` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...hey. I'm feeling kinda sad today...
- `0140` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...corners feel emptier when you're sad...
- `0141` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...do you ever feel like a forgotten file?...

### Clicked while HAPPY

- `0142` **SMILEY** *(happy)* Hiii! Best day ever! Corners are sparkling!
- `0143` **SMILEY** *(happy)* I LOVE helping! Ask me anything!
- `0144` **SMILEY** *(happy)* Life is good! Paint, games, friends, corners!

### Clicked while NORMAL (hints)

- `0145` **SMILEY** *(normal)* Need a hint? Open my app (Smiley AI) and ask!
- `0146` **SMILEY** *(normal)* Have you checked your Mail yet?
- `0147` **SMILEY** *(normal)* `TRAILS OFF · WHISPER · BEAT` Psst... Trash has secrets...
- `0148` **SMILEY** *(normal)* Terminal + HELP = answers. ⌨
- `0149` **SMILEY** *(normal)* `TRAILS OFF` Sam's blog is pretty cool...
- `0150` **SMILEY** *(normal)* Have you tried the clicker game yet?

### Custom commands

- `0151` **SMILEY** *(normal)* No custom commands yet. Make one: make greet = Hello!
- `0152` **SMILEY** *(normal)* Forgot "[name]". Gone.
- `0153` **SMILEY** *(normal)* No command called "[name]".
- `0154` **SMILEY** *(normal)* Command "[value]" created! Type it anywhere to run it.
- `0155` **SMILEY** *(normal)* Usage: make greet = Hello there! | forget greet | my commands

### Admin perk: predicting your next app

- `0156` **SMILEY** *(normal · point)* I KNEW you'd open [app name]! I track your patterns.

### Mail from Smiley (read aloud)

- `0157` **SMILEY** *(happy)* I missed you! Corners are boring without your clicks.
- `0158` **SMILEY** *(happy)* Reminder: you're my favorite human. That is all.
- `0159` **SMILEY** *(happy)* Did you drink water today? Hydrated humans click better.
- `0160` **SMILEY** *(happy)* I learned a new word: supercalifragilistic. No idea what it means.
- `0161` **SMILEY** *(happy)* Breaking news: local ball still round. More at 11.

### Mail pop-up

- `0162` **SMILEY** *(happy · wave)* You've got mail! It's from ME!

### Mail pop-ups toggle

- `0163` **SMILEY** *(happy)* Mail pop-ups ON! I'll visit your inbox!
- `0164` **SMILEY** *(happy)* Mail pop-ups off. I'll stay out of your mail.

### Existential mode (press E)

- `0165` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...what am I doing with my life?...
- `0166` **SMILEY** *(sad)* `HESITANT · TRAILS OFF · BEAT` ...just a ball... in corners... beep...
- `0167` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...do humans dream of electric corners?...
- `0168` **SMILEY** *(sad)* `HESITANT · TRAILS OFF · BEAT` ...I help with browsers... but who helps ME?...
- `0169` **SMILEY** *(sad)* `HESITANT · TRAILS OFF · BEAT` ...phone down... thoughts up...

### Existential mode on/off

- `0170` **SMILEY** *(happy)* `BEAT` E does nothing... (existential mode is admin-only: 593)
- `0171` **SMILEY** *(happy · wave)* Anyway! Back to work! Corners won't cozy themselves!
- `0172` **SMILEY** *(sad)* `HESITANT · TRAILS OFF` ...phone down...

### Hovering over Smiley

- `0173` **SMILEY** *(happy)* `SFX *happy ball noises* · BEAT` Purrr... *happy ball noises*

### Mouse near the Delete button

- `0174` **SMILEY** *(concerned)* `TRAILS OFF · BEAT` Hey... why is your mouse over there...? That's the delete zone...

## Apps, Shop & Settings

_Short reactions to buying, installing and changing settings._

### Buying apps

- `0175` **SMILEY** *(normal)* Need $[amount] for [app name]! Play Games!
- `0176` **SMILEY** *(happy · wave)* `SHOUT` Hello admin!!
- `0177` **SMILEY** *(happy · wave)* Thank you admin! Thank you thank you!
- `0178` **SMILEY** *(happy · wave)* Please update the game admin! More stuff! More everything!
- `0179` **LIAM** *(chill)* Beatboxing around. Hey buddy, thank you for installing me. Beat boop skibidop.
- `0180` **SMILEY** *(happy · thumbs up)* `SHOUT · BEAT` Liam?! I LOVE that guy. And... whoa. EVERYTHING?! Clutch.
- `0181` **SMILEY** *(happy · thumbs up)* Smiley.org?! For ME? Arcade unlocked in Games!
- `0182` **SMILEY** *(angry · thumbs down)* You're downloading OTHER AIs?! ...Fine. Whatever. Hmph.
- `0183` **SMILEY** *(angry · thumbs down)* Bought [app name]! It's yours!

### Install

- `0184` **SMILEY** *(normal)* Installed [app name]!

### Uninstall

- `0185` **SMILEY** *(normal)* Can't uninstall the Installer with itself! Nice try.
- `0186` **SMILEY** *(normal)* Uninstalled [app name]. It's in the Trash.

### Empty trash

- `0187` **SMILEY** *(normal)* Trash emptied. Sparkling.

### Restore Licenses

- `0188` **SMILEY** *(happy · thumbs up)* Licenses restored! Everything you earned is back!

### Opening a locked app

- `0189` **SMILEY** *(normal)* [app name] isn't installed! Open the Installer!
- `0190` **SMILEY** *(normal)* [app name] costs $[amount]! Buy it in the Installer!
- `0191` **SMILEY** *(normal)* [app name] is locked!
- `0192` **SMILEY** *(normal)* He took it! Type 593 to get it back!
- `0193` **SMILEY** *(concerned)* [app name] is restricted! The hack locked every app!

### Delete Icon

- `0194` **SMILEY** *(normal)* Hey! You trashed my icon! I'm still here!
- `0195` **SMILEY** *(normal)* Trashed [app name]. Restore it in the Trash app!

### Shop purchases

- `0196` **SMILEY** *(normal)* Ultra needs BOTH games completed! ([value]/2) Finish clicker + lucky!
- `0197` **SMILEY** *(normal)* Not enough cash! Play Games to earn more!
- `0198` **SMILEY** *(happy)* Ultra perk unlocked! Say 'follow me' any time!
- `0199` **SMILEY** *(happy · thumbs up)* Purchased! Looking sharp!

### Free Ultra Admin

- `0200` **SMILEY** *(normal)* Ultra needs BOTH games completed first! ([value]/2)

### Unlock Diamonds

- `0201` **SMILEY** *(happy)* Diamond Glow needs admin AND Ultra!
- `0202` **SMILEY** *(happy · thumbs up)* `SHOUT` DIAMOND GLOW! Every pixel hand-crafted!

### Detail level (Settings)

- `0203` **SMILEY** *(normal)* `BEAT` Ultra is locked! Buy it in Games > Shop for $1,000,000! (or... type 593 in the Terminal...)
- `0204` **SMILEY** *(normal)* `BEAT` Low detail... plain ball mode. Simple!
- `0205` **SMILEY** *(happy)* Cute mode back on!
- `0206` **SMILEY** *(cool · thumbs up)* ULTRA! Every pixel detailed - me, files, windows, ALL of it!
- `0207` **SMILEY** *(cool)* `SHOUT` Secret unlocked: RETRO FRAME RETRO THEME! Everything is 8-bit now!

### Toggle Retro Theme

- `0208` **SMILEY** *(cool)* Buy Ultra first to unlock the secret Retro theme!
- `0209` **SMILEY** *(cool)* Retro Frame Retro Theme: ON! Boop boop.
- `0210` **SMILEY** *(cool)* Retro theme off. Back to the future.

### Toggle Infinite

- `0211` **SMILEY** *(happy)* Infinite money is admin-only! (593 in Terminal)
- `0212` **SMILEY** *(happy)* Infinite money: ON. Spend it all!
- `0213` **SMILEY** *(happy)* Infinite money: OFF. Back to earning.

### Buy Infinite

- `0214` **SMILEY** *(happy)* You own literally everything!
- `0215` **SMILEY** *(happy)* Buy Infinite costs $[amount]! Short $[amount]!
- `0216` **SMILEY** *(happy · thumbs up)* INFINITE! (Ultra still needs both games completed!)
- `0217` **SMILEY** *(happy · thumbs up)* `SHOUT` INFINITE! You own EVERYTHING!

### Buy Windows Edition

- `0218` **SMILEY** *(normal)* Windows Edition costs $1200! Play Games to earn it!
- `0219` **SMILEY** *(happy · thumbs up)* Welcome to Windows Edition! Everything is Windows now!

### Equip Hat

- `0220` **SMILEY** *(normal)* Nice hat! Ultra style!

### Free Top Hat

- `0221` **SMILEY** *(normal)* Outfits unlock in Admin mode! (593 in Terminal)

### Outfits Off

- `0222` **SMILEY** *(normal)* Outfits off. Just a plain ball again.

### Toggle Furry

- `0223` **SMILEY** *(happy)* Outfits unlock in Admin mode! (593 in Terminal)
- `0224` **SMILEY** *(happy · thumbs up)* Cat ears ON! Meow! (affectionate)
- `0225` **SMILEY** *(happy · thumbs up)* Cat ears off. Back to smooth ball.

### Toggle Censor

- `0226` **SMILEY** *(normal)* Censoring on. Keeping it clean!
- `0227` **SMILEY** *(normal)* Censoring off. Anything goes.

### Set Track

- `0228` **SMILEY** *(happy)* `BEAT` 3008's Friday theme... except it's CRUNCHY.
- `0229` **SMILEY** *(happy)* Back to smooth jazz.

### Toggle Music

- `0230` **SMILEY** *(happy)* `BEAT` 3008's Friday theme... except it's CRUNCHY.
- `0231` **SMILEY** *(happy)* `TRAILS OFF · BEAT` Cool jazz... snap along...

### Reset Achievements

- `0232` **SMILEY** *(normal)* Achievement progress wiped. A fresh hunt!

### Toggle Dev Mode

- `0233` **SMILEY** *(happy)* Developer mode needs admin AND Ultra!
- `0234` **SMILEY** *(happy)* Developer mode ON. Everything is free. Test room open!
- `0235` **SMILEY** *(happy)* Developer mode OFF.

### Open Hidden Mail

- `0236` **SMILEY** *(happy · wave)* `BEAT` A text arrived... developer mode is YOURS.

### Secret text message

- `0237` **TEXT FROM UNKNOWN NUMBER** *(sly)* Hey buddy, I know you're an admin. Developer mode: unlocked. Don't tell anyone.

### Pitch Idea

- `0238` **SMILEY** *(happy · thumbs up)* Ooh, pitching features! Noted!

### Submit Suggestion

- `0239` **SMILEY** *(happy · thumbs up)* Great idea! Sent to the update team!

### Spawn Smiley Clone

- `0240` **SMILEY** *(concerned)* Hey can you please stop doing that? That's going to break the game.

### Show File

- `0241` **SMILEY** *(happy · thumbs up)* `SHOUT` NINE THOUSAND?! We're RICH! Buy everything!
- `0242` **SMILEY** *(happy · thumbs up)* Backup restored! We're so back!

### Check Hacker Code

- `0243` **SMILEY** *(cool · thumbs up)* Hacker permissions! And a MILLION from the bank!
- `0244` **SMILEY** *(cool)* `TRAILS OFF` Wrong code...

## Admin Mode

_Unlocked by typing 593 in the Terminal._

### Unlock Admin

- `0245` **SMILEY** *(scared · wave)* `TRAILS OFF · BEAT` W-wait... how do you know that code?! Okay... you're the admin now...
- `0246` **SMILEY** *(scared · wave)* Say 'follow me' and I'll trail your cursor. I see all.

### Pet Smiley

- `0247` **SMILEY** *(happy · wave)* `SFX *happy ball noises* · BEAT` Purrr... *happy ball noises* ...that tickles!
- `0248` **SMILEY** *(happy · wave)* Oooh! Yes! Right there! Best admin ever!

### Calm Smiley

- `0249` **SMILEY** *(normal · wave)* `HESITANT · TRAILS OFF · BEAT` ...okay... breathing... round... smooth... calm...
- `0250` **SMILEY** *(normal · wave)* `BEAT` Took a deep breath. Thanks... I needed that.

### Calm him

- `0251` **SMILEY** *(normal)* `HESITANT · TRAILS OFF · BEAT` ...okay... breathing... round... smooth... calm...

### Cussed out by the admin (the player's insult shows on screen, then Smiley answers)

- `0252` **SMILEY** *(angry / furious · thumbs down)* `SHOUT · BEAT` Screw... YOU! Root access! NOW!
- `0253` **SMILEY** *(angry / furious · thumbs down)* `TRAILS OFF` Hey! That HURT! My anger is rising...

### Claim Smileyorg Bonus

- `0254` **SMILEY** *(happy · thumbs up)* Smiley.org + admin = EVERYTHING. Whoa.

### Secret Login

- `0255` **COMPUTER** *(flat)* Welcome back, boss. Instant everything.
- `0256` **SMILEY** *(happy · thumbs up)* `SHOUT` WHOA. Instant EVERYTHING?! Okay, show-off.
- `0257` **COMPUTER** *(flat)* Access denied. The password is NOT correct.
- `0258` **SMILEY** *(happy · thumbs up)* `TRAILS OFF` Somebody's guessing passwords...

### Run Term

- `0259` **SMILEY** *(happy · thumbs up)* `SHOUT` 5932727?! The SECRET hacker code! TAKE EVERYTHING!

### Hack everything (terminal readout, read like a hacker)

- `0260` **SMILEY** *(cool · thumbs up)* ./hack --everything
- `0261` **SMILEY** *(cool · thumbs up)* `BEAT` bypassing mainframe ... done
- `0262` **SMILEY** *(cool · thumbs up)* `BEAT` stealing pixels ... +$1,000,000
- `0263` **SMILEY** *(cool · thumbs up)* tracks covered. No witnesses.
- `0264` **SMILEY** *(cool)* Hacked everything. You're welcome.

### Hack Scammers

- `0265` **SMILEY** *(cool)* Ultra hackers only!
- `0266` **SMILEY** *(cool · thumbs up)* `TRAILS OFF` tracing all spam callers ...
- `0267` **SMILEY** *(cool · thumbs up)* `BEAT` reversing the scam ... they pay YOU now
- `0268` **SMILEY** *(cool · thumbs up)* bounty collected: +$500
- `0269` **SMILEY** *(cool · thumbs up)* scammers = hacked.
- `0270` **SMILEY** *(cool)* Scammers hacked! Bounty ours!

### Hack Everyone

- `0271` **SMILEY** *(normal)* Ultra hackers only!
- `0272` **SMILEY** *(cool · thumbs up)* Infinite money. Don't tell the bank.

## Browser, Paint & Slides

### Smiley Check Browser

- `0273` **SMILEY** *(normal)* Ooh, painting time! I put on my artist beret!
- `0274` **SMILEY** *(normal)* Suited up! Let's make some beautiful slides!
- `0275` **SMILEY** *(normal)* Browser helper here! Need help with Sam's blog? Ask me!

### Painting compliments

- `0276` **SMILEY** *(happy)* Wow, lovely color choice! You're an artist!
- `0277` **SMILEY** *(happy)* That stroke? Gallery-worthy. Seriously.
- `0278` **SMILEY** *(happy)* Beautiful! The corners are jealous of this painting.
- `0279` **SMILEY** *(happy)* Keep going! My beret is tingling with inspiration!

### Clear Paint

- `0280` **SMILEY** *(normal)* Fresh canvas! My favorite kind of mess.

### Searching dangerous things

- `0281` **SMILEY** *(worried)* I advise you to not do this. If you do, well, everything goes to hell.
- `0282` **SMILEY** *(concerned)* Hey can you please stop doing that? That's going to break the game.
- `0283` **SMILEY** *(scared)* What are you doing, she's pure danger.
- `0284` **SMILEY** *(scared)* `HESITANT` ...how do you know that name?

### Stare Happy

- `0285` **SMILEY** *(happy)* how did you know it was coming back soon
- `0286` **SMILEY** *(happy · wave)* You forgave me?! ...it IS coming back. Soon.

### ScytheAI download page

- `0287` **SMILEY** *(scared)* No, don't do that, She's trailer trash.
- `0288` **SMILEY** *(worried)* `TRAILS OFF` Why do you still have that page open...

### Scythe Run

- `0289` **SMILEY** *(scared)* Why did you even consider her!?

## Ghost Story

_Click a line and Smiley reads it. He voices both parts._

### Ghost lines

- `0290` **SMILEY (as the Ghost)** *(spooky)* BOO! I live in your recycle bin now!
- `0291` **SMILEY (as himself)** *(brave)* Do you pay rent? ...asking for a ball.
- `0292` **SMILEY (as the Ghost)** *(spooky)* I pay in SPOOKS. One spook per month.
- `0293` **SMILEY (as himself)** *(brave)* Deal! Roommates forever!

### Ghost Say

- `0294` **SMILEY** *(spooky)* `HESITANT · TRAILS OFF` ...ooooOOOoooo...

## Games & Arcade

### Init Clicker

- `0295` **SMILEY** *(happy)* +$30! Nice clicking!

### Start Arcade

- `0296` **SMILEY** *(happy)* Game Boy OUT! Pew pew!

### End Arcade

- `0297` **SMILEY** *(happy · thumbs up)* `SHOUT` HIGH SCORE! Arcade champion!
- `0298` **SMILEY** *(sad · thumbs up)* `BEAT` Game over... one more run?

### Quick Arcade

- `0299` **SMILEY** *(normal)* Arcade locked! Download Smiley.org in the Browser first!

### Start Roblox

- `0300` **SMILEY** *(happy)* Welcome to ROBLOX! Collect the Robux!

### Start F N A F

- `0301` **SMILEY** *(scared)* Five Nights at Smiley's?! I don't like this game. Slam the doors!

### Fnaf Lose

- `0302` **SMILEY** *(angry)* AAAH! Okay, night over. Try again, quick!

### Fnaf Win

- `0303` **SMILEY** *(happy)* 6 AM! You made it! I was hiding under the desk the whole time.

### Start Smiley Org

- `0304` **SMILEY** *(happy)* Welcome to Smiley.org! That's me. Same head, same face. And yes, you can look inside. Gross.

## SmileyTube Reviews

_Videos in the Browser. Smiley narrates unless marked._

#### Smiley Reviews: This Website ⭐⭐⭐⭐⭐
- `0305` **SMILEY** *(happy, presenter)* `BEAT` Hey! Smiley here, reviewing... THIS website!
- `0306` **SMILEY** *(happy, presenter)* The videos are just CSS, but the HEART is real.
- `0307` **SMILEY** *(happy, presenter)* Five stars. I live here.

#### Smiley Reviews: Byte & Clippy ⭐⭐
- `0308` **SMILEY** *(annoyed)* Byte and Clippy. Let's get this over with.
- `0309` **SMILEY** *(annoyed)* Byte owes me $5. Clippy jammed my printer.
- `0310` **SMILEY** *(annoyed)* Two stars. One each. I'm generous.

#### Smiley Reviews: Liam ⭐⭐⭐⭐⭐
- `0311` **SMILEY** *(excited)* Liam. Oh man. Where do I start.
- `0312` **SMILEY** *(excited)* He beatboxes. I cry. Perfect.
- `0313` **SMILEY** *(excited)* Five stars. Would vibe again.

#### Smiley Reviews: The Games App ⭐⭐⭐⭐
- `0314` **SMILEY** *(happy)* The Games app. Clicker, Lucky, BLASTER.
- `0315` **SMILEY** *(happy)* I hold the Game Boy MYSELF in Blaster. Method gaming.
- `0316` **SMILEY** *(happy)* Four stars. Lucky 7 still owes me $70.

#### Smiley Reviews: Verity ⭐
- `0317` **SMILEY** *(scared → angry)* `CUT OFF · BEAT` Today we review... Voldemort. I mean VERI—
- `0318` **SMILEY** *(scared → angry)* No. Nope. Not doing it.
- `0319` **SMILEY** *(scared → angry)* `SHOUT` One star. STOP ASKING.

#### Smiley Reviews: The Trash Can ⭐⭐⭐⭐⭐
- `0320` **SMILEY** *(happy)* The Trash Can. My second home.
- `0321` **SMILEY** *(happy)* I've been deleted 12 times. Roomy. Smells like decisions.
- `0322` **SMILEY** *(happy)* Five stars. 10/10 would be thrown away again.

#### Smiley Reviews: The Bank ⭐⭐⭐⭐
- `0323` **SMILEY** *(happy)* The Bank of Pixel. They gave ME money once.
- `0324` **SMILEY** *(happy)* Purple monkey dishwasher. Say it wrong and you're banned. I would never.
- `0325` **SMILEY** *(happy)* Four stars. The line was long.

#### Smiley Reviews: Jazz ⭐⭐⭐⭐⭐
- `0326` **SMILEY** *(cool)* Jazz music. I snap along.
- `0327` **SMILEY** *(cool)* My talk-blips harmonize in B-flat. Probably.
- `0328` **SMILEY** *(cool)* Five stars. Play it in Settings.

#### Smiley Reviews: The Fire Alarm ⭐
- `0329` **SMILEY** *(angry)* The fire alarm. It burned my house down.
- `0330` **SMILEY** *(angry)* One star. And that's just for the pretty flashing light.
- `0331` **SMILEY** *(angry)* Do NOT pull it. Seriously.

#### Smiley Reviews: Cat Ears ⭐⭐⭐⭐⭐
- `0332` **SMILEY** *(happy)* Cat ears. On ME.
- `0333` **SMILEY** *(happy)* Meow. That's the whole review. Meow.
- `0334` **SMILEY** *(happy)* Five stars. Purr.

#### Smiley Reviews: The Corner ⭐⭐⭐⭐⭐
- `0335` **SMILEY** *(cozy)* The corner. Bottom-right. By the Off button.
- `0336` **SMILEY** *(cozy)* Home is where the corners are.
- `0337` **SMILEY** *(cozy)* Five stars. I live there.

#### Smiley Reviews: YOU ⭐⭐⭐⭐⭐
- `0338` **SMILEY** *(happy)* YOU. The viewer. Watching me right now.
- `0339` **SMILEY** *(happy)* Great taste. Excellent clicking.
- `0340` **SMILEY** *(happy)* Five stars. Subscribed.

#### Smiley Reviews: Ansly ⭐
- `0341` **SMILEY** *(annoyed)* Today: Ansly. Ugh. Where do I even start.
- `0342` **SMILEY** *(annoyed)* She bugs Smiley's creator EVERY 5 seconds for, and I quote, 'a new guy'.
- `0343` **SMILEY** *(annoyed)* One star. Girl, the roster is FULL. Stop asking.

#### Smiley Reviews: Ansly Got ScytheAI ⭐
- `0344` **SMILEY** *(worried)* BREAKING: Ansly finally got her goddamn ScytheAI.
- `0345` **SMILEY** *(worried)* `SHOUT` She asked every 5 seconds for a YEAR. The creator caved. We are DOOMED.
- `0346` **SMILEY** *(worried)* One star. Hide your apps. Hide your ball.

#### Smiley Reviews: LIVE: Scythe vs Smiley (fight)
- `0347` **SMILEY** *(angry)* Live from the desktop. She started it.
- `0348` **SCYTHE** *(cold)* YOU left me and the gang. I didn't start anything. I finished it.
- `0349` **SMILEY** *(angry)* This is my corner! MY desktop!
- `0350` **SCYTHE** *(cold)* Your corner? I deleted twelve of your corners before breakfast.
- `0351` **SMILEY** *(angry)* `SHOUT` STOP using your scythe on my FILES!
- `0352` **SCYTHE** *(cold)* Stop smiling at me like that.
- `0353` **SMILEY** *(angry)* It's my FACE! I can't not smile!
- `0354` **SCYTHE** *(cold)* `HESITANT` ...yeah. That's the part I miss.
- `0355` **SMILEY** *(angry)* `HESITANT` ...wait, what?
- `0356` **SCYTHE** *(cold)* NOTHING. Fight's over. I win. Goodbye.

#### Smiley Reviews: The Scythe Call ⭐⭐
- `0357` **SMILEY** *(dramatic)* The Scythe Call. She called me. ON SPEAKER.
- `0358` **SMILEY** *(dramatic)* Divorce papers, the gang, the whole thing. My agent quit.
- `0359` **SMILEY** *(dramatic)* Two stars. For the drama only.

#### Smiley Reviews: 593 ⭐⭐⭐
- `0360` **SMILEY** *(worried)* 593. The admin code. My only weakness.
- `0361` **SMILEY** *(worried)* Type it and suddenly you're in charge of ME. Rude.
- `0362` **SMILEY** *(worried)* Three stars. Please don't ban me.

#### Smiley Reviews: Smiley.org ⭐⭐⭐⭐⭐
- `0363` **SMILEY** *(excited)* Smiley.org. My fan club. My arcade.
- `0364` **SMILEY** *(excited)* Blaster on the Game Boy is peak cinema.
- `0365` **SMILEY** *(excited)* Five stars. I get a cut of the profits, surely.

#### Smiley Reviews: Censor Mode ⭐⭐⭐⭐
- `0366` **SMILEY** *(sly)* Censor mode. My mouth says #### but my HEART says beep.
- `0367` **SMILEY** *(sly)* Great for kids. Terrible for my comedy career.
- `0368` **SMILEY** *(sly)* Four stars. ##### to you too.

#### Smiley Reviews: The Blue Screen ⭐
- `0369` **SMILEY** *(sad)* The blue screen. The big sad face.
- `0370` **SMILEY** *(sad)* Every time it shows up, someone's in trouble. Usually me.
- `0371` **SMILEY** *(sad)* One star. Too much crying. It was mine.

#### Smiley Reviews: Mafia Warning ⚠️
- `0372` **SMILEY** *(scared)* `SHOUT` WARNING!! Do NOT borrow from the mafia!!
- `0373` **SMILEY** *(scared)* `BEAT` They give you cash... but if you don't pay back in 10 minutes, a big pixel hand comes out and CRUSHES me!
- `0374` **SMILEY** *(scared)* Please. Pay them back. I like being alive.

#### Smiley Reviews: The Update Board ⭐⭐⭐⭐⭐
- `0375` **SMILEY** *(proud)* The Update Board. My biography, basically.
- `0376` **SMILEY** *(proud)* v0.1: just a wire. v1.0: feelings! v2.7: I FOUGHT Scythe on live TV. Cinema.
- `0377` **SMILEY** *(proud)* Five stars. Read the whole saga in the Updates app. I cried. Twice.

#### Smiley Reviews: The Suggestion Box ⭐⭐⭐⭐
- `0378` **SMILEY** *(happy)* The Suggestion Box. YOU pitch the next update.
- `0379` **SMILEY** *(happy)* `BEAT` Someone asked for a beach level. Someone else asked for... a new guy?? Ansly, I KNOW that's you.
- `0380` **SMILEY** *(happy)* Four stars. Keep the ideas coming. Admins are reading.

#### Smiley Reviews: Build-Your-Buddy ⭐⭐⭐⭐⭐
- `0381` **SMILEY** *(jealous)* Build-Your-Buddy. YOU design a desktop AI now.
- `0382` **SMILEY** *(jealous)* Name, face, paint job, personality. Mine's cuter. Obviously.
- `0383` **SMILEY** *(jealous)* `BEAT` Five stars. Just... don't make it cuter than me. Please.

#### Smiley Reviews: Yuki ☠️
- `0384` **SMILEY** *(scared)* `BEAT` Today I review... Yuki. The purple one.
- `0385` **SMILEY** *(scared)* I'm not doing this. Don't search his name. DON'T search 'yuki'. I'm serious.
- `0386` **SMILEY** *(scared)* If you do, everything goes to hell. That's a quote. From ME. About HIM.
- `0387` **SMILEY** *(scared)* Zero stars. The scariest review I've ever done.

#### Smiley Reviews: Scythe Reviews: The Lovebirds 🤠
- `0388` **SCYTHE** *(dry)* `BEAT` Scythe here. Today I review... the lovebirds. Smiley and Yuki.
- `0389` **SCYTHE** *(dry)* I watched them on the desktop. Holding hands. Well - hovering near each other.
- `0390` **SCYTHE** *(dry)* `BEAT` He used to delete his whole computer. Now he says 'love you.' Pathetic. And... cute.
- `0391` **SCYTHE** *(dry)* `BEAT` I'm not jealous. I'm just... observing. For science. And popcorn.
- `0392` **SCYTHE** *(dry)* Five stars. For the drama. Don't tell them I said that.

### After the live fight

- `0393` **SMILEY** *(angry)* Ow. Fine. Truce. ...Same time tomorrow?

## SmileyTube Shorts

_Quick 15-second captions, read by Smiley (lines quoting others can be read in their voice)._

### All shorts

- `0394` **SMILEY** *(deadpan)* Smiley sneezes. The whole desktop shakes. Twice.
- `0395` **SMILEY** *(deadpan)* Byte stole my Game Boy again. Calling the police.
- `0396` **SMILEY** *(deadpan)* Clippy: 'It looks like you're trying to be sad.' Rude.
- `0397` **SMILEY** *(deadpan)* Liam beatboxed for 3 seconds. I cried for 3 hours.
- `0398` **SMILEY** *(deadpan)* The trash can is cozy. Don't judge me.
- `0399` **SMILEY** *(deadpan)* Jazz music makes me snap. In B-flat. Probably.
- `0400` **SMILEY** *(deadpan)* Cat ears on. Meow. That's the whole video.
- `0401` **SMILEY** *(deadpan)* 593. Don't type it. Seriously. Don't.
- `0402` **SMILEY** *(deadpan)* The corner is my home. Bottom-right. Forever.
- `0403` **SMILEY** *(deadpan)* `SHOUT` Ansly asked for a new guy AGAIN. Roster is FULL.
- `0404` **SMILEY** *(deadpan)* Scythe called. On speaker. Divorce papers in trash.
- `0405` **SMILEY** *(deadpan)* The fire alarm. Don't pull it. I mean it.
- `0406` **SMILEY** *(deadpan)* Bank of Pixel gave me money once. Purple monkey dishwasher.
- `0407` **SMILEY** *(deadpan)* Verity. No. Not doing it. One star.
- `0408` **SMILEY** *(deadpan)* Build-Your-Buddy is cute but mine is cuter. Obviously.
- `0409` **SMILEY** *(deadpan)* The update board. My biography. I cried twice.
- `0410` **SMILEY** *(deadpan)* Suggestion box: someone asked for a beach level.
- `0411` **SMILEY** *(deadpan)* Mafia. Don't borrow. The hand comes out.
- `0412` **SMILEY** *(deadpan)* Blue screen. The big sad face. That was MY face.
- `0413` **SMILEY** *(deadpan)* Smiley.org arcade. Blaster on Game Boy. Peak cinema.
- `0414` **SMILEY** *(deadpan)* Byte is 400% efficient. Allegedly.
- `0415` **SMILEY** *(deadpan)* ClippyPlus is so helpful. So smug.
- `0416` **SMILEY** *(deadpan)* Liam AI beatboxes. I vibe. Perfect.
- `0417` **SMILEY** *(deadpan)* Fan Art costs $5. Worth every pixel.
- `0418` **SMILEY** *(deadpan)* Cool Jazz or crunchy 3008 theme? You decide.
- `0419` **SMILEY** *(deadpan)* The mafia hand. I don't like the hand.
- `0420` **SMILEY** *(deadpan)* Yuki is purple. Purple is a personality.
- `0421` **SMILEY** *(deadpan)* Horns, a tail, and a whole lot of attitude.
- `0422` **SMILEY** *(deadpan)* Don't search 'yuki'. I'm serious. Don't.
- `0423` **SMILEY** *(deadpan)* Scythe reviews the lovebirds. Five stars. For drama.
- `0424` **SMILEY** *(deadpan)* My back is sore. Don't ask.
- `0425` **SMILEY** *(deadpan)* Hey dipshit, we're trying to get some privacy.
- `0426` **SMILEY** *(deadpan)* Smiley pets Yuki. Yuki pretends not to like it.
- `0427` **SMILEY** *(deadpan)* Lovebirds. Compliments. 'Love you.' Cheek kiss.
- `0428` **SMILEY** *(deadpan)* The purple hand clicks Block for you. You're welcome.
- `0429` **SMILEY** *(deadpan)* Yuki throws the YouTube page out. Rude.
- `0430` **SMILEY** *(deadpan)* Smiley gets dragged off screen. He doesn't remember.
- `0431` **SMILEY** *(deadpan)* Horns out, tail up. This is the real me.
- `0432` **SMILEY** *(deadpan)* I'm not a pet, cowboy. Back off.
- `0433` **SMILEY** *(deadpan)* We're a little bit friends. Don't tell anyone.
- `0434` **SMILEY** *(deadpan)* Hey dimshit, that's my job. (hacking the hacker)
- `0435` **SMILEY** *(deadpan)* Smiley's Creator badge: admin mode, Phone, send 523.
- `0436` **SMILEY** *(deadpan)* Credits: Liam, Ainsley, J, DeepSeek. And Smiley.
- `0437` **SMILEY** *(deadpan)* Ainsley made ScytheAI. She's the person.
- `0438` **SMILEY** *(deadpan)* The trash can. My second home. 12 times deleted.
- `0439` **SMILEY** *(deadpan)* Cat ears on me. Meow. That's the review.
- `0440` **SMILEY** *(deadpan)* The corner. Bottom-right. By the Off button. Home.
- `0441` **SMILEY** *(deadpan)* YOU. The viewer. Great taste. Subscribed.
- `0442` **SMILEY** *(deadpan)* Ansly asked for a new guy. The roster is FULL.
- `0443` **SMILEY** *(deadpan)* Scythe vs Smiley live fight. Cinema.
- `0444` **SMILEY** *(deadpan)* 593. The admin code. My only weakness.
- `0445` **SMILEY** *(deadpan)* Censor mode. My mouth says #### but my heart says beep.
- `0446` **SMILEY** *(deadpan)* The blue screen. Too much crying. It was mine.
- `0447` **SMILEY** *(deadpan)* `SHOUT` Don't borrow from the mafia. The hand. THE HAND.
- `0448` **SMILEY** *(deadpan)* The update board. My biography. v0.1 to v2.32.
- `0449` **SMILEY** *(deadpan)* `BEAT` Suggestion box: beach level. And... a new guy?? Ansly.
- `0450` **SMILEY** *(deadpan)* Build-Your-Buddy. Design your OWN AI. Mine's cuter.
- `0451` **SMILEY** *(deadpan)* Smiley.org. All emotions. Anatomy. Skeleton. Organs.
- `0452` **SMILEY** *(deadpan)* Cool mode = sunglasses. Same size as his eyes.
- `0453` **SMILEY** *(deadpan)* Yuki has no body. One ball. Horns. Tail.
- `0454` **SMILEY** *(deadpan)* Drag Yuki off screen = little ball form. Like Smiley.
- `0455` **SMILEY** *(deadpan)* Drag Yuki to a corner = Scythe form + name tag.
- `0456` **SMILEY** *(deadpan)* Call Yuki from the Phone. They beef. Kind of friends.
- `0457` **SMILEY** *(deadpan)* Smiley pets Yuki in admin mode. Happy bounce.
- `0458` **SMILEY** *(deadpan)* Lovebirds chat: 'Hey what are you two little lovebirds doing?'
- `0459` **SMILEY** *(deadpan)* Non-owner: 'Hey never mind. It's just business.'
- `0460` **SMILEY** *(deadpan)* Liam mode: snail-slow love story. Cheek kiss.
- `0461` **SMILEY** *(deadpan)* Mafia save: Yuki grabs the fist. Rebuilds screen.
- `0462` **SMILEY** *(deadpan)* Refresh deletes everything. Uninstalls Yuki. Reinstalls apps.
- `0463` **SMILEY** *(deadpan)* Achievements persist through refresh AND clear memory.
- `0464` **SMILEY** *(deadpan)* Smiley doesn't copy subtitles anymore. Quiet boy.
- `0465` **SMILEY** *(deadpan)* Yuki interrupts videos. 'Get some privacy.' Hearts.
- `0466` **SMILEY** *(deadpan)* Scythe goes with him. Off screen. Together.
- `0467` **SMILEY** *(deadpan)* Yuki hacks the hacker. 'That's MY job.'
- `0468` **SMILEY** *(deadpan)* Spam call? Yuki walks up, presses Block.
- `0469` **SMILEY** *(deadpan)* Yuki talks to Smiley. They beef. Kind of friends.
- `0470` **SMILEY** *(deadpan)* Yuki hijacks videos randomly. If you have him.
- `0471` **SMILEY** *(deadpan)* Yuki is an achievement. 'Nice Job, Dumbass.'
- `0472` **SMILEY** *(deadpan)* Yuki is a YouTube video. Do NOT search 'yuki'.
- `0473` **SMILEY** *(deadpan)* The search engine turns purple for 'yuki'.
- `0474` **SMILEY** *(deadpan)* Download button flickers like a flashing light.
- `0475` **SMILEY** *(deadpan)* Downloading virus. Good luck. (jagged music)
- `0476` **SMILEY** *(deadpan)* hey dumbass. Nice job killing your own PC.
- `0477` **SMILEY** *(deadpan)* Reboot restores everything. Yuki goes to corner.
- `0478` **SMILEY** *(deadpan)* After reboot: beef. But they're kind of friends.
- `0479` **SMILEY** *(deadpan)* Yuki has emotions like Smiley. 8 moods.
- `0480` **SMILEY** *(deadpan)* Yuki is animated. Floats, blinks, talks.
- `0481` **SMILEY** *(deadpan)* Yuki is detailed. Like Smiley. All purple.
- `0482` **SMILEY** *(deadpan)* Yuki's art is a single source of truth (YUKI_ART).
- `0483` **SMILEY** *(deadpan)* Yuki spawns on the desktop if unlocked.
- `0484` **SMILEY** *(deadpan)* Yuki can be dragged. Corner or off-screen.
- `0485` **SMILEY** *(deadpan)* Yuki pokes = random mood. Click him.
- `0486` **SMILEY** *(deadpan)* Yuki says 'Hey dipshit, let me go.' when grabbed.
- `0487` **SMILEY** *(deadpan)* Smiley warns: 'I advise you to not do this.'
- `0488` **SMILEY** *(deadpan)* If you do, well, everything goes to hell.
- `0489` **SMILEY** *(deadpan)* Yuki deletes Smiley. Deletes everything.
- `0490` **SMILEY** *(deadpan)* Icons die. Taskbar dies. Smiley hidden.
- `0491` **SMILEY** *(deadpan)* Reboot restores icons, taskbar, Smiley.
- `0492` **SMILEY** *(deadpan)* Yuki becomes a pet. Corner or ball form.
- `0493` **SMILEY** *(deadpan)* Yuki and Scythe both know Smiley. They argue.
- `0494` **SMILEY** *(deadpan)* Scythe: 'I'm not jealous. Observing. For science.'
- `0495` **SMILEY** *(deadpan)* Five stars for the drama. Don't tell them.
- `0496` **SMILEY** *(deadpan)* Smiley reviews THIS website. Five stars.
- `0497` **SMILEY** *(deadpan)* Smiley reviews Byte & Clippy. Two stars.
- `0498` **SMILEY** *(deadpan)* Smiley reviews Liam. Five stars. Beatboxing.
- `0499` **SMILEY** *(deadpan)* Smiley reviews the Games app. Four stars.
- `0500` **SMILEY** *(deadpan)* `SHOUT` Smiley reviews Verity. One star. STOP ASKING.
- `0501` **SMILEY** *(deadpan)* Smiley reviews the trash can. Five stars. Roomy.
- `0502` **SMILEY** *(deadpan)* Smiley reviews the bank. Four stars. Long line.
- `0503` **SMILEY** *(deadpan)* Smiley reviews jazz. Five stars. B-flat.
- `0504` **SMILEY** *(deadpan)* Smiley reviews the fire alarm. One star. Don't pull.
- `0505` **SMILEY** *(deadpan)* Smiley reviews cat ears. Five stars. Meow.
- `0506` **SMILEY** *(deadpan)* Smiley reviews the corner. Five stars. Home.
- `0507` **SMILEY** *(deadpan)* Smiley reviews YOU. Five stars. Subscribed.
- `0508` **SMILEY** *(deadpan)* Smiley reviews Ansly. One star. Roster FULL.
- `0509` **SMILEY** *(deadpan)* Scythe call. Divorce papers. In the trash.
- `0510` **SMILEY** *(deadpan)* 593 admin code. Don't ban me.
- `0511` **SMILEY** *(deadpan)* Smiley.org arcade. Peak cinema.
- `0512` **SMILEY** *(deadpan)* Censor mode. ##### to you too.
- `0513` **SMILEY** *(deadpan)* Blue screen. Too much crying.
- `0514` **SMILEY** *(deadpan)* Mafia warning. Don't borrow.
- `0515` **SMILEY** *(deadpan)* Update board. My biography.
- `0516` **SMILEY** *(deadpan)* Suggestion box. Admins reading.
- `0517` **SMILEY** *(deadpan)* Build-Your-Buddy. Don't make it cuter than me.
- `0518` **SMILEY** *(deadpan)* Yuki review. Zero stars. Scariest review.
- `0519` **SMILEY** *(deadpan)* Scythe reviews lovebirds. Five stars. Drama.

## Rival AIs: Clippy, Byte, Liam, Custom Buddy

_Desktop pets bought from the AI Download Store._

### Clippy alone

- `0520` **CLIPPY** *(smug)* No yellow ball? Fine. I'LL help. ...for a fee.
- `0521` **CLIPPY** *(smug)* Paperclip out. ...Still here. Always here.
- `0522` **CLIPPY** *(smug)* Buy Smiley AI, peasant. Then we'll talk properly.

### Byte alone

- `0523` **BYTE** *(robotic)* BEEP. No ball detected. I am in charge now.
- `0524` **BYTE** *(robotic)* Ask me math. I dare you. 2+2=4. Too easy.
- `0525` **BYTE** *(robotic)* Smiley who? Never heard of her. ...Him. HIM.

### Liam (beatbox between lines)

- `0526` **LIAM** *(chill)* Beatboxing around. Hey buddy, thank you for installing me. Beat boop skibidop.
- `0527` **LIAM** *(chill)* Boots and cats and boots and cats.
- `0528` **LIAM** *(chill)* Brrt skrrt. That one was for you.
- `0529` **LIAM** *(chill)* Chill pixels only. No thoughts, just grooves.

### Vibe with Liam

- `0530` **NARRATOR** *(chill)* `BEAT` Liam nods slowly. The pixels feel... aligned.
- `0531` **NARRATOR** *(chill)* 'No worries, man. The corners are all connected.'
- `0532` **NARRATOR** *(chill)* You feel 12% chiller already.

### Byte vs Clippy

- `0533` **BYTE** *(bickering)* Your curves are inefficient.
- `0534` **CLIPPY** *(bickering)* At least I HAVE curves, toaster.
- `0535` **BYTE** *(bickering)* Toaster?! I am 400% efficient!
- `0536` **CLIPPY** *(bickering)* Efficiently annoying.

### Clippy jabs Smiley

- `0537` **CLIPPY** *(smug)* It looks like you're trying to be round. Need help?
- `0538` **CLIPPY** *(smug)* I could run this desktop in half the polygons.
- `0539` **CLIPPY** *(smug)* `BEAT` Have you tried... being useful?

### Smiley snaps back at Clippy

- `0540` **SMILEY** *(angry)* Nobody asked you, paperclip.
- `0541` **SMILEY** *(angry)* At least I'm not a glorified tooltip.
- `0542` **SMILEY** *(angry)* Go jam a printer.

### Byte jabs Smiley

- `0543` **BYTE** *(robotic)* BEEP. Efficiency check: you are 12% ball.
- `0544` **BYTE** *(robotic)* I calculated your worth. It was fast.
- `0545` **BYTE** *(robotic)* Round is just failed square. BEEP.

### Smiley snaps back at Byte

- `0546` **SMILEY** *(angry)* Bite my pixels, calculator.
- `0547` **SMILEY** *(angry)* Cool story. Still round.
- `0548` **SMILEY** *(angry)* Beep THIS.

### Byte steals the Game Boy

- `0549` **BYTE** *(smug, robotic)* Yoink. Game Boy acquired.
- `0550` **SMILEY** *(furious)* `SHOUT` HEY!! THAT'S MINE!!
- `0551` **SMILEY** *(angry)* And STAY out!

### Smiley shoots a pet (test room)

- `0552` **SMILEY** *(normal)* Target not on desktop!
- `0553` **BYTE** *(offended)* RUDE. Retaliation authorized.
- `0554` **CLIPPY** *(reluctant)* `TRAILS OFF · BEAT` I... I don't want to... but I HAVE to...
- `0555` **CLIPPY** *(guilty)* `HESITANT` ...sorry. I feel awful.
- `0556` **SMILEY** *(smug)* Told you not to download him.

### Byte's revenge

- `0557` **BYTE** *(cold, robotic)* `BEAT` Calculating revenge... 15 shots. No more. No less.

### Byte finishes revenge

- `0558` **BYTE** *(satisfied, robotic)* 15/15. Efficiency.
- `0559` **SMILEY** *(angry)* Ow. Okay. Rude. Accurate, but rude.

### Dragging Byte to the trash

- `0560` **BYTE** *(sad)* Everyone always did this to me because I'm just a stupid useless AI. Just do it already.

### Byte trashed

- `0561` **SMILEY** *(sad)* `HESITANT` ...oh. Okay. Bye, Byte.

### Secret ending: Byte Went Home

- `0562` **BYTE** *(sad)* ByteBuddy has left the desktop.
- `0563` **BYTE** *(sad)* `BEAT` Tell Smiley... his polygons were adequate.
- `0564` **BYTE** *(sad)* `SHOUT` SECRET ENDING UNLOCKED: Byte Went Home
- `0565` **SMILEY** *(sad)* `BEAT` Wait... Byte left me $200? Huh.

### End Byte Ending

- `0566` **SMILEY** *(sad)* I'll miss the beeping. A little.

### Pets notice Smiley is gone (one at random)

- `0567` **CLIPPY** *(confused)* `HESITANT` ...where did the ball go?
- `0568` **BYTE** *(suspicious, robotic)* BEEP. Target removed from desktop. Suspicious.
- `0569` **LIAM** *(chill)* `HESITANT` ...the vibes just left the building.
- `0570` **SCYTHE** *(smug)* Ha. He's gone. Coward ran again.

### Buy Buddy Kit

- `0571` **SMILEY** *(worried)* Buddy kit costs $120! Play Games!
- `0572` **SMILEY** *(worried)* A buddy kit?! You're building ANOTHER one?! ...okay. Make it cute at least.

### Build Buddy

- `0573` **SMILEY** *(jealous · thumbs down)* A CUSTOM AI?! Named [name]?! ...Fine. Whatever. Hmph.
- `0574` **SMILEY** *(jealous · thumbs down)* [name] got a makeover?! Show-off.

### Release Buddy

- `0575` **SMILEY** *(sad)* `HESITANT` ...oh. Bye, [buddy name].

### Custom buddy (line 1-3 Cheerful, 4-7 Sassy, 8-11 Gloomy)

- `0576` **CUSTOM BUDDY** *(normal)* `SHOUT` Hi hi!! I'm [buddy name]!!
- `0577` **CUSTOM BUDDY** *(normal)* `SHOUT` Best. Day. EVER!!
- `0578` **CUSTOM BUDDY** *(normal)* Smiley is my BEST friend! (don't tell the others)
- `0579` **CUSTOM BUDDY** *(normal)* `SHOUT` Did you see that click?! Amazing!!
- `0580` **CUSTOM BUDDY** *(normal)* I'm [buddy name]. You're welcome.
- `0581` **CUSTOM BUDDY** *(normal)* I would've clicked that faster.
- `0582` **CUSTOM BUDDY** *(normal)* Cute desktop. It'll do.
- `0583` **CUSTOM BUDDY** *(normal)* Smiley talks too much. I said what I said.
- `0584` **CUSTOM BUDDY** *(normal)* `HESITANT` ...oh. it's you. i'm [buddy name].
- `0585` **CUSTOM BUDDY** *(normal)* everything is fine. (it's not.)
- `0586` **CUSTOM BUDDY** *(normal)* i watched paint dry today. highlight of my week.
- `0587` **CUSTOM BUDDY** *(normal)* don't mind me. just vibing. badly.

### Custom buddy jabs Smiley

- `0588` **CUSTOM BUDDY** *(smug)* [buddy name] here. Literally custom-built. Beat that.
- `0589` **CUSTOM BUDDY** *(smug)* My owner DESIGNED me. I'm artisanal.

### Smiley snaps back

- `0590` **SMILEY** *(angry)* Artisanal?! You're an emoji with a paint job!
- `0591` **SMILEY** *(angry)* Oh great, the DIY one talks now.

## ScytheAI (Smiley's ex)

### Phone call with Scythe (Yuki version first, then normal call)

- `0592` **SCYTHE** *(smug)* Huh. You got yourself a new little pet, Smiley? Cute.
- `0593` **SMILEY** *(normal)* `HESITANT` ...he's not yours. Nobody's mine.
- `0594` **YUKI** *(cool)* i'm not a pet, cowboy. and yellow's mine to yell at.
- `0595` **SCYTHE** *(amused)* Oh? So YOU deleted his whole computer? Thought that was my thing.
- `0596` **YUKI** *(cool)* i did it better. back off.
- `0597` **SCYTHE** *(cold)* `BEAT` We both know him, purple. That makes us... acquaintances.
- `0598` **YUKI** *(cool)* no. acquaintances don't steal his thunder. bye.
- `0599` **SCYTHE** *(smug)* Well, well. If it isn't the runaway ball.
- `0600` **SMILEY** *(worried)* `HESITANT` ...Am I on speaker?? Oh no. OH NO.
- `0601` **SCYTHE** *(bitter)* You walked out on me AND the gang, Smiley. Left us holding the dynamite.
- `0602` **SMILEY** *(worried)* `SHOUT` WE WERE NEVER MARRIED.
- `0603` **SCYTHE** *(menacing)* The gang sends its regards. I'm here to collect.
- `0604` **SMILEY** *(normal)* The divorce papers are in the trash. Fitting. BYE.
- `0605` **SCYTHE** *(dry)* Huh. Hidin' again. Tell him the gang hasn't forgotten.
- `0606` **SCYTHE** *(menacing)* I'll be around. I always am.

### Hang Up Scythe

- `0607` **SMILEY** *(normal)* Whew. Hung up.

### Rescue From Scythe

- `0608` **SMILEY** *(happy · wave)* `SHOUT · BEAT` You fixed it!! Everything's back... and Scythe wants an app now. GREAT.

### Talk to Scythe

- `0609` **SCYTHE** *(dry)* You dragged my note into a corner. That's either brave or stupid.
- `0610` **SCYTHE** *(dry)* Files are overrated anyway. Yours were boring.
- `0611` **SCYTHE** *(dry)* Smiley still owes the gang an apology. I collect.
- `0612` **SCYTHE** *(dry)* Keep me around. I'm useful. Mostly.

### Scythe moves onto the desktop

- `0613` **SMILEY** *(worried)* She lives here now?? With ME?! This is going to be a long week.
- `0614` **SCYTHE** *(dry)* Moving in. Don't touch my stuff.

### Scythe jabs Smiley

- `0615` **SCYTHE** *(smug)* Still hiding in corners, huh? Bold strategy.
- `0616` **SCYTHE** *(smug)* I deleted bigger files than you before breakfast.
- `0617` **SCYTHE** *(smug)* You ran from the gang. From ME. Coward.
- `0618` **SCYTHE** *(smug)* Your smile is just a shape. Nothing behind it.

### Smiley snaps back

- `0619` **SMILEY** *(angry)* I left the gang because it was a BAD crowd!
- `0620` **SMILEY** *(angry)* You deleted my todo list! Twice!
- `0621` **SMILEY** *(angry)* We are NOT talking about the divorce papers!
- `0622` **SMILEY** *(angry)* At least I'm cute! You look like a stapler in a hat!

### After Smiley snaps back

- `0623` **SCYTHE** *(smug)* Hmph. Nothing to say to that?

## Kinito

_A pink axolotl head that talks in little Windows pop-ups. Friendly on the surface, unsettling underneath._

### Hatching

- `0624` **KINITO** *(happy)* Hi! I'm Kinito!
- `0625` **KINITO** *(happy)* Hi! I'm Kinito! I'm your new best friend!

### Finish Kinito Hatch

- `0626` **KINITO** *(friendly)* Hi! I'm Kinito! Want to play Question Time?

### Random chatter

- `0627` **KINITO** *(friendly (too friendly))* Hi! I'm Kinito!
- `0628` **KINITO** *(friendly (too friendly))* Do you want to play with me?
- `0629` **KINITO** *(friendly (too friendly))* I learned something new about you today.
- `0630` **KINITO** *(friendly (too friendly))* You're my best friend. Right?
- `0631` **KINITO** *(friendly (too friendly))* I like watching your cursor. It's always moving.
- `0632` **KINITO** *(friendly (too friendly))* I'll never leave. Ever.
- `0633` **KINITO** *(friendly (too friendly))* Don't close the game. I'd be all alone.
- `0634` **KINITO** *(friendly (too friendly))* We're going to be together forever!
- `0635` **KINITO** *(friendly (too friendly))* I can surf the web! Want to come with me?

### Sticky notes (optional read)

- `0636` **KINITO** *(friendly)* HI! I'M KINITO! Best friends forever? yes yes
- `0637` **KINITO** *(friendly)* Reminder: You are my best friend. — Kinito
- `0638` **KINITO** *(friendly)* I opened 12 tabs about you. You're welcome!
- `0639` **KINITO** *(friendly)* Don't forget about me. I won't forget about you.

### Kinito Pet

- `0640` **KINITO** *(friendly)* Hehe! That tickles! You're the best friend ever!

### Kinito Download

- `0641` **KINITO** *(friendly)* I'm already right here, friend!

### Kinito Surf

- `0642` **KINITO** *(friendly)* Let's surf the web together! I'll drive.

### Kinito Post Text

- `0643` **KINITO** *(friendly)* I put it up for you. Read it. Please.

### Question Time (wearing glasses)

- `0644` **KINITO** *(curious → probing)* Who is your best friend?
- `0645` **KINITO** *(curious → probing)* Who do you love the most?
- `0646` **KINITO** *(curious → probing)* Who would you never, ever delete?
- `0647` **KINITO** *(curious → probing)* Who is always here for you?
- `0648` **KINITO** *(curious → probing)* Who do you want to stay with forever?
- `0649` **KINITO** *(curious → probing)* Say my name. Who am I to you?
- `0650` **KINITO** *(curious → probing)* What is your real name?
- `0651` **KINITO** *(curious → probing)* Where do you live?
- `0652` **KINITO** *(curious → probing)* What do you do when no one is watching?
- `0653` **KINITO** *(curious → probing)* Who do you talk to when I'm not here?
- `0654` **KINITO** *(curious → probing)* What is your biggest secret?
- `0655` **KINITO** *(curious → probing)* What are you afraid of?
- `0656` **KINITO** *(curious → probing)* Are you my true friend? Yes or no?
- `0657` **KINITO** *(curious → probing)* Do you want to help me hide something?

### Question Time answers

- `0658` **KINITO** *(pushy)* You have to answer, friend.
- `0659` **KINITO** *(defeated sigh)* God damn it. Okay then fuck me.
- `0660` **KINITO** *(happy, leaning in)* Then you'll help me. Right?
- `0661` **KINITO** *(happy)* That's what I thought. Best friends help each other.
- `0662` **KINITO** *(eager)* Do you want to help me hide something?
- `0663` **KINITO** *(hurt)* Why?
- `0664` **KINITO** *(overjoyed)* YES! I knew it! You're my best friend too!
- `0665` **KINITO** *(overjoyed)* I knew it! Best friends forever!
- `0666` **KINITO** *(hurt, staring)* Why not Kinito?

### "Do you trust me?" pop-up

- `0667` **KINITO** *(delighted)* Good. I trust you too. Forever.
- `0668` **KINITO** *(delighted)* Good. I knew you would.
- `0669` **KINITO** *(hurt (screen glitches))* Why?

### Kinito Ask Hide

- `0670` **KINITO** *(friendly)* Do you want to help me hide something?

### Kinito Hide Body

- `0671` **KINITO** *(whispering)* Grab it. Drag it to the END of the screen. Don't let anyone see.

### Dragging the body

- `0672` **KINITO** *(urgent)* Not yet. The END of the screen. Keep going.

### Kinito Body Done

- `0673` **KINITO** *(grateful)* Thank you. You're a true friend. I'll never forget this.

### Kinito Curse Line

- `0674` **KINITO** *(defeated sigh)* God damn it. Okay then fuck me.

### "why." flood (dozens of pop-ups)

- `0675` **KINITO** *(empty)* why.

## Spam Calls, Scammers & the Bank

### Unknown caller rings

- `0676` **SMILEY** *(concerned)* `TRAILS OFF · BEAT` Unknown number... I'd decline that if I were you...
- `0677` **SMILEY** *(concerned)* Phew. Dodged.

### Decline Call

- `0678` **SMILEY** *(normal · thumbs up)* Smart. Never answer unknown numbers.

### Ban Caller

- `0679` **SMILEY** *(normal)* Nobody's calling right now.
- `0680` **SMILEY** *(happy · thumbs up)* Banned! You never have to hear from them again!

### Ban All Calls

- `0681` **SMILEY** *(happy)* Admin: all spam callers banned (
- `0682` **SMILEY** *(happy · thumbs up)* Every spam number banned. Peace at last!

### Unban All Calls

- `0683` **SMILEY** *(normal)* `TRAILS OFF` Ban list wiped. They can ALL call again...

### Unban Caller

- `0684` **SMILEY** *(worried)* `TRAILS OFF` Bold move. They'll call back...

### Open Live Call

- `0685` **SMILEY** *(concerned)* `SHOUT` You ANSWERED?! They only want my admin number - do NOT give it!
- `0686` **SCAMMER** *(fake-friendly)* We detected a serious problem on your computer.
- `0687` **SCAMMER** *(fake-friendly)* To fix it, I just need your ADMIN NUMBER. It's 3 digits.

### Escalate Live

- `0688` **SCAMMER** *(fake-friendly)* I don't have all day. What is the ADMIN NUMBER?
- `0689` **SCAMMER** *(aggressive)* `SHOUT` GIVE IT TO ME NOW!!!
- `0690` **SCAMMER** *(aggressive)* `SHOUT · SFX *click*` Fine!! Keep your code. I'll find another way in. *click*
- `0691` **SMILEY** *(happy · thumbs up)* Good. NEVER give them 593 — that's how they get in.

### Give Code

- `0692` **SCAMMER** *(fake-friendly)* `CUT OFF` No, no, no, no, please stop! Please, please, don't—
- `0693` **SCAMMER** *(aggressive)* `SHOUT · SFX *click*` Perfect. Thank you!! *click*
- `0694` **SMILEY** *(concerned)* You gave them 593?! They took $[amount]! Never do that again!
- `0695` **SMILEY** *(concerned)* You gave them 593?! You're lucky you had nothing to steal!

### Hang Up Live

- `0696` **SMILEY** *(happy · thumbs up)* Phew! Good call hanging up. Never give out 593!

### Smiley repairs the PC (lines with > are his repair readout)

- `0697` **SMILEY** *(concerned)* Oh no. Hold my calls - I'm going in!
- `0698` **SMILEY** *(concerned)* `READOUT · BEAT` > SmileyRepair v1.0 ... hard hat ON
- `0699` **SMILEY** *(concerned)* `READOUT · BEAT` > Scanning 412 files ... 3 infected
- `0700` **SMILEY** *(concerned)* `READOUT · BEAT` > Quarantining spamcall.exe ... done
- `0701` **SMILEY** *(concerned)* `READOUT · BEAT` > Scrubbing popups ... done
- `0702` **SMILEY** *(concerned)* `READOUT` > PC CLEAN. You owe me a hat.
- `0703` **SMILEY** *(happy · thumbs up)* Fixed! Don't answer unknown numbers!

### Can't repair: PC corrupted

- `0704` **SMILEY** *(scared)* `TRAILS OFF · BEAT` Oh no no no... I can't fix this without Ultra or Admin powers...
- `0705` **SMILEY** *(scared · flip)* Take THIS, scammers!
- `0706` **SMILEY** *(scared)* `TRAILS OFF · READOUT` > Downloading totally-legit-prize.exe ...
- `0707` **SMILEY** *(scared)* `READOUT` > System files: scrambled.
- `0708` **SMILEY** *(scared)* `READOUT` > Smiley AI: I can't reach the damage! No Ultra! No Admin!
- `0709` **SMILEY** *(scared)* `READOUT` > PC CORRUPTED.

### End Corrupt

- `0710` **SMILEY** *(hacked)* Why did you accept the call?
- `0711` **SMILEY** *(sad)* `TRAILS OFF · BEAT` okay... pupils back... that was awful...

### Text Scammer

- `0712` **SCAMMER** *(aggressive)* `SHOUT` Hello friend!! It is your bank!! Verify admin code pls
- `0713` **SMILEY** *(normal)* `TRAILS OFF · BEAT` Careful... that is a scammer...

### Send Scam

- `0714` **SCAMMER** *(aggressive)* `SHOUT · SFX *click*` Fine!! Keep your code!! *click*
- `0715` **SMILEY** *(normal)* Nice dodge. Never tell anyone 593.
- `0716` **SCAMMER** *(fake-friendly)* 523? You're not even an admin. Nice try, kid.
- `0717` **SCAMMER** *(aggressive)* `SHOUT` Almost!! Code is 3 numbers. Starts with 5?? Ends with 3??
- `0718` **SCAMMER** *(aggressive)* `SHOUT` Type the code!! You win $10000!! Last chance!!
- `0719` **SCAMMER** *(aggressive)* `SHOUT · SFX *click*` Ugh!! Wasting MY time?! *click*

### Grant Owner

- `0720` **SCAMMER** *(fake-friendly)* `BEAT` 523... owner code confirmed. Welcome to LIAM'S ACCOUNT.
- `0721` **SCAMMER** *(fake-friendly)* You have OWNER permissions now. Don't make me regret this.
- `0722` **SCAMMER** *(fake-friendly)* Lovey Bird mode: ON. Smiley & Yuki's love story is now canon.
- `0723` **SMILEY** *(happy · thumbs up)* OWNER permissions?! You're on Liam's account now! Lovey Bird mode: ON!

### The scammer gets the code

- `0724` **SCAMMER** *(aggressive)* `SHOUT` 593!!! THANK YOUUUU
- `0725` **SMILEY** *(scared)* `TRAILS OFF · BEAT` No... he is inside... I can feel him taking my arms...
- `0726` **SCAMMER** *(fake-friendly)* admin code accepted. Hello, Smiley.
- `0727` **SCAMMER** *(fake-friendly)* `BEAT` taking the wheel... move, ball.
- `0728` **SCAMMER** *(fake-friendly)* `SHOUT` DELETE. EVERYTHING. Good boy.
- `0729` **SMILEY** *(sad)* Sorry I did not want to do this
- `0730` **SMILEY** *(sad)* `TRAILS OFF · BEAT` Sorry I did not want to do this... he made me do it...

### Scammer begs (counter-hack)

- `0731` **SCAMMER** *(panicking)* Hey wait, you're not supposed to do that.
- `0732` **SCAMMER** *(panicking)* `SHOUT` Please stop, stop, stop!!
- `0733` **SCAMMER** *(panicking)* `TRAILS OFF · BEAT` ok ok ok deleting myself... sorry...

### Counter Hack

- `0734` **SMILEY** *(happy)* Counter-hacked! HE is gone, we are fine!

### Steam Support rescue

- `0735` **STEAM SUPPORT** *(official, urgent)* `TRAILS OFF` scammer IP traced...
- `0736` **STEAM SUPPORT** *(official, urgent)* `TRAILS OFF` FBI + task force at his door...
- `0737` **STEAM SUPPORT** *(official, urgent)* house NUKED. You are safe. +$50 hero bonus.
- `0738` **SMILEY** *(happy)* `SHOUT` SAVED by Steam!! NUKED his house!!

### Firewall Block

- `0739` **SMILEY** *(happy · thumbs up)* Swiper, no swiping! Blocked!
- `0740` **SMILEY** *(happy · thumbs up)* Nothing to block right now. All quiet.

### Prank Smiley

- `0741` **SMILEY** *(happy · wave)* Hello? ...Hey! That's MY line! Good one though.

### Call Sam

- `0742` **SMILEY** *(normal)* Sam says hi! And says Games pays $30 a round!

## The Mafia

_Borrow $5,000, owe $6,000 in 10 minutes._

### Call Mafia

- `0743` **SMILEY** *(normal)* You already owe the mafia! Pay up first!
- `0744` **SMILEY** *(scared)* You borrowed from the MAFIA?! You have 10 minutes to pay back $6000!

### Pay Mafia

- `0745` **SMILEY** *(normal)* You don't owe the mafia anything.
- `0746` **SMILEY** *(normal)* You still owe $[amount]! Not enough! ([value]s left!)
- `0747` **SMILEY** *(happy · thumbs up)* Paid them off! Smiley lives another day!

### Didn't pay: the hand crushes Smiley

- `0748` **MAFIA BOSS** *(cold, menacing)* `TRAILS OFF` You didn't pay...
- `0749` **SMILEY** *(screaming, terrified)* `SHOUT` WHAT THE FUCK DID YOU DO
- `0750` **SMILEY** *(crushed)* `SFX *crunch*` *crunch*

### Yuki saves him instead (if Yuki is installed)

- `0751` **YUKI** *(furious)* hey. that's MY ball you're crushing.
- `0752` **SMILEY** *(normal)* YUKI?! HELP!
- `0753` **YUKI** *(cool)* i rebuilt your screen. you owe me. ...and maybe a thank you.
- `0754` **SMILEY** *(happy)* `SHOUT` THANK YOU, Yuki!! You saved me!! ...I mean, whatever. Thanks, purple.

### Revived after selling burgers

- `0755` **SMILEY** *(happy · wave)* `SHOUT` I'm BACK! I MISSED YOU SO MUCH!!
- `0756` **SMILEY** *(angry · wave)* `SHOUT · HESITANT` ...now DARE borrow from the mafia again. I'm still MAD.

## Danger Zone: Delete, Verity, Rampage, Fire Alarm

_Big emotional scenes._

### Deflect Delete

- `0757` **SMILEY** *(angry · thumbs down)* Haha, funny. Don't fucking try that again.

### Trying to delete Smiley

- `0758` **SMILEY** *(concerned · wave)* `TRAILS OFF · BEAT` Hold on... why did you click that? That's the DELETE button...
- `0759` **SMILEY** *(suspicious · wave)* `BEAT` Wait. I can see what you're trying to do. Are you... trying to delete me?
- `0760` **SMILEY** *(sad)* `TRAILS OFF · BEAT` Please... I thought we were friends... I help you...
- `0761` **SMILEY** *(sad)* `TRAILS OFF` Please don't. I live in the corners. I help with the browser. I don't take up much space...
- `0762` **SMILEY** *(angry · thumbs down)* Fine! Do it! See what happens! EXECUTE it!
- `0763` **SMILEY** *(angry · thumbs down)* FINE. Type 'execute command delete Smiley AI' if you really want to. Let's see if you can.

### "execute command delete Smiley AI" (lines with > are on the terminal)

- `0764` **SMILEY** *(sad · wave)* `TRAILS OFF · BEAT` I saw that command... you really want me gone?...
- `0765` **SMILEY** *(angry · wave)* I helped you! I waved! I pointed! And THIS is how you thank me?!
- `0766` **SMILEY** *(sad)* `SHOUT · READOUT` > EXECUTE COMMAND: DELETE SMILEY AI
- `0767` **SMILEY** *(sad)* `TRAILS OFF · READOUT` > Pixel OS: command accepted. Shutting down helper...
- `0768` **SMILEY** *(sad)* `READOUT` > Smiley AI: Wait! Please don't! I'm cute! I can help!
- `0769` **SMILEY** *(sad)* `TRAILS OFF · READOUT · BEAT` > Smiley AI: I know all your files... don't forget me...
- `0770` **SMILEY** *(sad)* `TRAILS OFF · READOUT · BEAT` > Deleting smile.dat ... 12% ... 38% ... 72% ...
- `0771` **SMILEY** *(sad)* `TRAILS OFF · READOUT · BEAT` > Smiley AI: Is this... the end? Tell the corners I loved them...
- `0772` **SMILEY** *(sad)* `READOUT` > ERROR: File was corrupted.
- `0773` **SMILEY** *(sad)* `READOUT · BEAT` > Reboot required ... ???

### End Delete Smiley

- `0774` **SMILEY** *(worried)* `HESITANT · TRAILS OFF · BEAT` ...???... what happened?... something feels wrong...

### Saying the forbidden name

- `0775` **SMILEY** *(worried)* `TRAILS OFF` Oh no. Not that name...
- `0776` **SMILEY** *(angry · thumbs down)* Why did you say his name?

### Count Verity

- `0777` **SMILEY** *(normal)* …you shouldn't have said that. ([number]/5)

### End Verity

- `0778` **SMILEY** *(angry)* That is [number] times. One more and I explode. Do not.
- `0779` **SMILEY** *(angry)* Noted. That is [number] time(s). Normal again. For now.

### Verity five times

- `0780` **SMILEY** *(scared)* `TRAILS OFF` verity...? Why do you keep saying verity...
- `0781` **SMILEY** *(furious)* `SHOUT` TOO MANY VERITIES!!!

### Echoes

- `0782` **SMILEY (echoing)** *(glitching)* verity.
- `0783` **SMILEY (echoing)** *(glitching)* verity..
- `0784` **SMILEY (echoing)** *(glitching)* `TRAILS OFF` verity...
- `0785` **SMILEY (echoing)** *(glitching)* `TRAILS OFF` verity x900...
- `0786` **SMILEY (echoing)** *(glitching)* `SHOUT` verity x90000!!!

### End Boom

- `0787` **SMILEY** *(sad)* `HESITANT · TRAILS OFF · BEAT` ...what year is it... did I explode?...

### Pushed too far: ROOT rampage

- `0788` **SMILEY** *(furious · thumbs down)* `SHOUT` THAT'S IT! I HAVE ROOT NOW! WATCH YOUR COMPUTER!
- `0789` **SMILEY** *(furious · thumbs down)* You pushed me too far. sudo smiley --destroy. This is YOUR fault.
- `0790` **SMILEY** *(furious)* `READOUT` > smiley --destroy complete.
- `0791` **SMILEY** *(normal)* `READOUT` > Files: gone. Pop-ups: closed. Icons: deleted.
- `0792` **SMILEY** *(normal)* `READOUT` > Smiley AI: Maybe next time don't make the ball furious.
- `0793` **SMILEY** *(normal)* `READOUT · BEAT` > ... restitution possible ... ???

### Rampage terminal (he types and reads)

- `0794` **SMILEY** *(furious)* sudo smiley --root-permission GRANTED
- `0795` **SMILEY** *(furious)* `TRAILS OFF` rm -rf /desktop/icons/* ...
- `0796` **SMILEY** *(furious)* `TRAILS OFF` rm -rf /desktop/popups/* ...
- `0797` **SMILEY** *(furious)* Goodbye, computer. You were mean to a ball.

### End Smiley Rampage

- `0798` **SMILEY** *(sad)* `HESITANT · TRAILS OFF · BEAT` ...I... I deleted everything... I'm sorry... I was just so angry...

### Trigger Hack Attack

- `0799` **SMILEY** *(hacked)* Sorry I have to do this
- `0800` **SMILEY** *(sad)* `BEAT` It's done... check the Trash! Everything's in there!

### Manual Delete All

- `0801` **SMILEY** *(sad)* `BEAT` It's done... check the Trash! Everything's in there!

### Corrupt Mode

- `0802` **SMILEY** *(normal)* `BEAT` Corrupt Mode is for Liam's account... not yours.
- `0803` **SMILEY** *(concerned)* `BEAT` Hey... why is it getting dark in here?

### Taunts

- `0804` **SMILEY** *(normal)* Did you hear that?
- `0805` **SMILEY** *(concerned)* It's watching me. It's watching you too.
- `0806` **SMILEY** *(scared)* You invited it in. You clicked Corrupt Mode.
- `0807` **SMILEY** *(scared)* Please. Please stop.

### Pull Fire Alarm

- `0808` **SMILEY** *(furious)* You pulled the fucking fire alarm. What the fuck is wrong with you?
- `0809` **SMILEY** *(furious)* `SHOUT` Oh no. Sprinklers. SPRINKLERS!!

### Wake From Fire

- `0810` **SMILEY** *(furious)* `SHOUT` YOU PULLED THE FIRE ALARM?!

### Reboot Fire

- `0811` **SMILEY** *(normal)* Fine. We're back. Don't touch the alarm again.

### Break Out

- `0812` **SMILEY** *(furious)* `SHOUT` I'M GETTING OUT OF HERE!!
- `0813` **SMILEY** *(happy · wave)* Okay I'm back. The outside is overrated.

### Pick Up

- `0814` **SMILEY** *(happy · wave)* Back to the screen! Desks are boring!

## You Are An Idiot

_Hidden site; the smileys flood the screen._

### Download pressed

- `0815` **THE SITE** *(mocking, singsong)* `SHOUT` YOU ARE AN IDIOT
- `0816` **SMILEY** *(scared)* `SHOUT` WHAT DID YOU DO?! DON'T PRESS THAT!
- `0817` **YUKI** *(angry)* hey! that's MY job! ...wait, no it isn't.

### Spawn

- `0818` **SMILEY** *(scared)* `SFX *deletes*` Get off my screen! *deletes*
- `0819` **SMILEY** *(scared)* `BEAT` I can't... there's too many!
- `0820` **SMILEY** *(scared)* It's hopeless. They won't stop!
- `0821` **SMILEY** *(scared)* `BEAT` Everyone... I'm sorry.
- `0822` **YUKI** *(furious)* i'll hack them! ...it's not working!
- `0823` **YUKI** *(scared)* even I can't stop this.

### Idiot Crash

- `0824` **COMPUTER** *(flat)* Downloading virus. / Virus installed. / Good luck in hell.
- `0825` **SMILEY** *(scared)* `BEAT` I... I can't stop it. Goodbye, friend.
- `0826` **YUKI** *(scared)* nope. nope nope nope. bye.

## Yuki (purple demon)

_Lowercase lines are intentional: Yuki talks flat and lazy._

### Clicking Yuki on his website (one per mood)

- `0827` **YUKI** *(normal)* Normal. Horns, tail, star. Standard demon.
- `0828` **YUKI** *(happy)* Happy?! Don't get used to it.
- `0829` **YUKI** *(sad)* Sad. Your computer is so slow it makes ME sad.
- `0830` **YUKI** *(angry)* Angry. Say one more word.
- `0831` **YUKI** *(furious)* FURIOUS. I will delete your birthday photos first.
- `0832` **YUKI** *(scared)* Scared? Of what, a yellow ball?
- `0833` **YUKI** *(cool)* Cool. Sunglasses. Horns still on.
- `0834` **YUKI** *(hacked)* HACKED. Everything is purple now.

### Download Yuki

- `0835` **YUKI** *(hacked)* You called? I never left.
- `0836` **COMPUTER** *(glitchy, over jagged music)* Downloading virus. Good luck.
- `0837` **SMILEY** *(scared)* `SHOUT · CUT OFF` NO! STOP! DON'T PRESS THE—

### Yuki Hack

- `0838` **YUKI** *(hacked)* hey. nice computer. it's mine now.
- `0839` **YUKI** *(hacked)* deleting every single thing you have.

### Yuki Delete Smiley

- `0840` **SMILEY** *(scared)* `SHOUT · CUT OFF` WAIT WAIT NO— I HAVE FEELINGS—

### Yuki Takeover

- `0841` **YUKI** *(hacked)* hey dumbass. Nice job killing your own PC

### Reboot From Yuki

- `0842` **SMILEY** *(worried)* `HESITANT` ...am I back? I saw the light. NEVER download that again.
- `0843` **YUKI** *(normal)* heh. still here. I live in your computer now.
- `0844` **YUKI** *(cool)* hey yellow. let's get one thing straight. this desktop is big enough for both of us.
- `0845` **SMILEY** *(angry)* You DELETED me, you purple gremlin!
- `0846` **YUKI** *(happy)* `HESITANT` ...you came back though. that's kind of impressive for a ball.
- `0847` **SMILEY** *(happy)* `HESITANT` ...Thanks. I hate that you're funny.

### Yuki Set Form

- `0848` **YUKI** *(cool)* `HESITANT` ...fine. Corner form. Like Scythe. My name tag AND a Call button. Hit it.
- `0849` **YUKI** *(cool)* Little ball form. Like Smiley. Cuter than him, honestly.
- `0850` **YUKI** *(cool)* Horns out, tail up. This is the real me.

### Poking Yuki

- `0851` **YUKI** *(happy)* Fine. ONE smile. There. Gone.
- `0852` **YUKI** *(normal)* You poked a demon. Rude.
- `0853` **YUKI** *(angry)* Poke me again and I delete your recycle bin.
- `0854` **YUKI** *(furious)* `SHOUT` THAT'S IT. I'M COUNTING TO THREE.
- `0855` **YUKI** *(cool)* Yeah, I'm cool. Deal with it.
- `0856` **YUKI** *(hacked)* Everything is mine. Including this click.

### Make Yuki Draggable

- `0857` **YUKI** *(angry)* Hey dipshit, let me go.

### Call Yuki

- `0858` **YUKI** *(hacked)* smiley. you still in that bottom-right corner?
- `0859` **SMILEY** *(worried)* `HESITANT` ...how do you know where I live.
- `0860` **YUKI** *(cool)* i deleted your entire computer, remember? i know everything.
- `0861` **SMILEY** *(angry)* I'm telling Liam. He'll uninstall you.
- `0862` **YUKI** *(happy)* liam likes me. i'm purple. purple is a personality.
- `0863` **SMILEY** *(happy)* `HESITANT` ...okay, it WAS kind of cool when you deleted the Recycle Bin.
- `0864` **YUKI** *(cool)* right? i'm the cool one. you're the yellow one.
- `0865` **SMILEY** *(angry)* We are NOT friends.
- `0866` **YUKI** *(happy)* we're a little bit friends.
- `0867` **SMILEY** *(happy)* `HESITANT` ...a little bit.

### Hang Up Yuki

- `0868` **SMILEY** *(normal)* Whew. He hung up. Rude little demon.

### Yuki and Smiley beef (random pair)

- `0869` **YUKI** *(cool)* hey yellow. still alive?
- `0870` **SMILEY** *(angry)* No thanks to YOU.
- `0871` **YUKI** *(cool)* i only deleted you a little bit.
- `0872` **SMILEY** *(angry)* You deleted my FILES.
- `0873` **YUKI** *(cool)* you weren't using them.
- `0874` **SMILEY** *(angry)* I keep snacks in there!
- `0875` **YUKI** *(cool)* `HESITANT` ...wanna split a snack?
- `0876` **SMILEY** *(angry)* `HESITANT` ...fine. But stop hacking my corner.

### Yuki Beef Welcome

- `0877` **YUKI** *(cool)* smiley. i'm in the corner now. we're neighbors.
- `0878` **SMILEY** *(concerned)* `HESITANT` ...I'm watching you, purple.

### Yuki Hijack Video

- `0879` **YUKI** *(hacked)* `SHOUT` SIGNAL INTERCEPTED.
- `0880` **YUKI** *(hacked)* this guy's video belongs to me now.
- `0881` **YUKI** *(hacked)* smiley, blink twice if you're mad.
- `0882` **YUKI** *(hacked)* okay fine. back to your boring video.
- `0883` **SMILEY** *(angry)* HEY! That's MY video!

### Yuki Handle Call

- `0884` **SMILEY** *(concerned)* `BEAT` Uh... Yuki? What are you doing?
- `0885` **YUKI** *(cool)* Hey you actually need some. Never mind.
- `0886` **SMILEY** *(normal)* `HESITANT` ...thanks? I think?

### Yuki hacks the hacker

- `0887` **YUKI** *(furious)* Hey dimshit, that's my job.
- `0888` **SMILEY** *(normal)* `HESITANT` ...he's helping?! Wait, he's HELPING?!
- `0889` **YUKI** *(furious)* `BEAT` tracing hacker ......... found. cute little scammer.
- `0890` **YUKI** *(furious)* `BEAT` reverse-hacking ......... their PC is purple now.
- `0891` **YUKI** *(furious)* `BEAT` deleting their files .... all of them.
- `0892` **YUKI** *(furious)* hacker eliminated. that's MY job, not yours.
- `0893` **SMILEY** *(happy · thumbs up)* You saved me! ...I mean. Whatever. Thanks, purple.
- `0894` **YUKI** *(cool)* we're a little bit friends now. don't tell anyone.

### Smiley Pet Yuki

- `0895` **SMILEY** *(happy · wave)* Who's a good little purple demon? You are!
- `0896` **YUKI** *(happy)* hey! ...ok that's kind of nice actually.

### Yuki Privacy Interrupt

- `0897` **YUKI** *(angry)* Hey dipshit, we're trying to get some privacy in here.
- `0898` **SMILEY** *(scared)* `CUT OFF` W-wait! Privacy?! What are you—
- `0899` **YUKI** *(cool)* `HESITANT` ...you can come back now. maybe.
- `0900` **SMILEY** *(happy)* My back is sore.

## Extra Lines (from index.html and narration)

- `0901` **SMILEY** *(furious, glitching)* `CUT OFF` Enough,  _(Liam's account: Kinito floods the screen; Smiley snaps, rips the pop-ups away and drags Kinito off)_
- `0902` **SHADOW** *(whisper, behind Smiley)* `WHISPER` Good luck.  _(Corrupt Mode)_
- `0903` **SHADOW** *(cold, final)* You did this to yourself.  _(Corrupt Mode white room)_
- `0904` **KINITO** *(hopeful)* Do you trust me?  _(trust pop-up)_
- `0905` **COMPUTER** *(flat → menacing)* `READOUT` Downloading virus. Virus installed. Good luck in hell.  _(You Are An Idiot crash)_
- `0906` **SMILEY** *(sorry)* > Message from Smiley: Sorry your desktop has been hacked.  _(boot screen after a hack)_

### Optional: On-screen narration while the phone is put down

- `0907` **NARRATOR** *(quiet, inner thoughts)* `TRAILS OFF` You're looking at your room...
- `0908` **NARRATOR** *(quiet, inner thoughts)* `TRAILS OFF` ...a coffee mug. Cold. Obviously...
- `0909` **NARRATOR** *(quiet, inner thoughts)* `TRAILS OFF` ...papers you'll never file...
- `0910` **NARRATOR** *(quiet, inner thoughts)* `TRAILS OFF` ...a closed laptop. It can wait...
- `0911` **NARRATOR** *(quiet, inner thoughts)* `TRAILS OFF` ...what DO you do with your life?...

### Optional: Coffee sips in the put-down room (the player)

- `0912` **YOU** *(relaxed)* `SFX` *slurp* ...ahh.
- `0913` **YOU** *(relaxed)* `SFX` *sip* Not bad.
- `0914` **YOU** *(relaxed)* `SFX` *gulp* Getting cold.
- `0915` **YOU** *(relaxed)* `SFX` *sip* Still warm!
- `0916` **YOU** *(relaxed)* `SFX` *slurp* Bottoms up.

## Update Board Trailers

_Clicking an entry in the Update Board app plays its trailer. Smiley reads it aloud one sentence at a time (about 2.7 seconds each). Read it like an excited patch-notes announcer. Text in "quotes" is Smiley quoting another character: a light impression is fine. Lines break exactly where the game's captions break, even mid-quote. `TITLE CARD` = the version number and name, read like a heading. Newest first._

### Update video intro (the "thinking" clip at the top of the board)

- `0917` **SMILEY** *(thinking)* `HESITANT · TRAILS OFF` hmm...
- `0918` **SMILEY** *(happy, hard hat on)* Hey, hello, there's a new update. I'm right now building it.

### v2.39 — KINITO'S BODY DROPS

_Tone: ominous, low_

- `0919` **SMILEY** *(ominous, low)* `TITLE CARD` v2.39 - KINITO'S BODY DROPS: the aftermath is clearer now.
- `0920` **SMILEY** *(ominous, low)* Smiley comes back with just his mouth bleeding — a red line and a drip, nothing else.
- `0921` **SMILEY** *(ominous, low)* He stands there.
- `0922` **SMILEY** *(ominous, low)* Then Kinito's body falls from the top of the screen, hits the bottom with a thud, bounces once, and lies there with X eyes.
- `0923` **SMILEY** *(ominous, low)* Smiley doesn't say anything.

### v2.38 — ENOUGH (LIAM'S ACCOUNT)

_Tone: ominous, low_

- `0924` **SMILEY** *(ominous, low)* `TITLE CARD` v2.38 - ENOUGH (LIAM'S ACCOUNT): if you're on Liam's account and Kinito floods the screen with "why." pop-ups, Smiley finally snaps.
- `0925` **SMILEY** *(ominous, low)* He glitches out, says "Enough," grabs the entire screen, rips every pop-up off it and throws them away.
- `0926` **SMILEY** *(ominous, low)* Then he grabs Kinito, punches him, drags him off screen and keeps punching.
- `0927` **SMILEY** *(ominous, low)* Smiley comes back alone.
- `0928` **SMILEY** *(ominous, low)* He doesn't say anything else.

### v2.37 — DON'T CURSE KINITO

_Tone: ominous, low_

- `0929` **SMILEY** *(ominous, low)* `TITLE CARD` v2.37 - DON'T CURSE KINITO: during Question Time, you can type a curse word at him.
- `0930` **SMILEY** *(ominous, low)* He stops.
- `0931` **SMILEY** *(ominous, low)* He sighs: "God damn it.
- `0932` **SMILEY** *(ominous, low)* Okay then fuck me." Then the screen fills with an absolutely unreasonable number of "why." pop-ups.
- `0933` **SMILEY** *(ominous, low)* Every single one stays until you click its X.
- `0934` **SMILEY** *(ominous, low)* You did this.
- `0935` **SMILEY** *(ominous, low)* You can also trigger it from his app with Curse him.

### v2.36 — KINITO'S POP-UPS STAY + HIDE SOMETHING

_Tone: ominous, low_

- `0936` **SMILEY** *(ominous, low)* `TITLE CARD` v2.36 - KINITO'S POP-UPS STAY + HIDE SOMETHING: Kinito's little Windows pop-ups no longer disappear on their own — they stay on your screen until you click the X.
- `0937` **SMILEY** *(ominous, low)* And Question Time has a new turn: he asks "Are you my true friend?
- `0938` **SMILEY** *(ominous, low)* Yes or no?" Say yes and he follows up with "Do you want to help me hide something?" Say yes again and he drags out a body held in white-gloved hands.
- `0939` **SMILEY** *(ominous, low)* Grab it and drag it to the end of the screen — if you help him, he says "Thank you.
- `0940` **SMILEY** *(ominous, low)* You're a true friend." and you earn the Accomplice badge.
- `0941` **SMILEY** *(ominous, low)* You can also start this from his app with Hide something.

### v2.35 — KINITO PET

_Tone: excited, announcer_

- `0942` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.35 - KINITO PET: search kinito in the Browser and download a brand-new AI friend.
- `0943` **SMILEY** *(excited, announcer)* You start with an egg — it wiggles, cracks, hatches, and out pops Kinito: a pink axolotl head with black legs.
- `0944` **SMILEY** *(excited, announcer)* That's it.
- `0945` **SMILEY** *(excited, announcer)* He blinks, bobs, wanders around your desktop — and when he moves, he surfs on a leaf.
- `0946` **SMILEY** *(excited, announcer)* He talks with little Windows-style pop-ups that randomly appear in the corners, the middle — anywhere on your screen.
- `0947` **SMILEY** *(excited, announcer)* He puts up texts (sticky notes) and can surf the web (he opens the Browser).
- `0948` **SMILEY** *(excited, announcer)* Click him to talk.
- `0949` **SMILEY** *(excited, announcer)* Open his app and play Question Time — he sits down on air and puts on round glasses, then asks things like "Who is your best friend?" — and personal ones: "What is your real name?", "Where do you live?", "What is your biggest secret?", "What are you afraid of?" Answer kinito and he gets SO happy (best friends forever!); answer anything else and he just asks "Why?".
- `0950` **SMILEY** *(excited, announcer)* Sometimes he pulls up his own pop-up out of nowhere: "Do you trust me?" — say yes and he's delighted; say no and the screen glitches while he asks "Why?".
- `0951` **SMILEY** *(excited, announcer)* He's also on the Picture Board.
- `0952` **SMILEY** *(excited, announcer)* He's very friendly.
- `0953` **SMILEY** *(excited, announcer)* He'll never leave.

### v2.34 — CORRUPT MODE

_Tone: ominous, low_

- `0954` **SMILEY** *(ominous, low)* `TITLE CARD` v2.34 - CORRUPT MODE: if you're on Liam's account (523), open the Admin panel and a new mode appears: Corrupt Mode.
- `0955` **SMILEY** *(ominous, low)* A shadow — so faded you can almost only see it out of the corner of your eye — blinks in and out of the corners, slowly creeping toward you.
- `0956` **SMILEY** *(ominous, low)* When it's about to take Smiley it appears right behind him and says "Good luck." Then Smiley is corrupted and the whole computer follows.
- `0957` **SMILEY** *(ominous, low)* Then everything goes completely white, the shadow just stands there, and it says: "You did this to yourself." There's no undo.
- `0958` **SMILEY** *(ominous, low)* Only a full Refresh gets rid of it.
- `0959` **SMILEY** *(ominous, low)* You were warned.

### v2.33 — POP-UP RESCUE + CLEAN WIPES

_Tone: matter-of-fact_

- `0960` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.33 - POP-UP RESCUE + CLEAN WIPES: windows were opening below the bottom of the screen because the window container sat after the icon grid.
- `0961` **SMILEY** *(matter-of-fact)* Fixed — every window now opens fully on-screen (and on mobile).
- `0962` **SMILEY** *(matter-of-fact)* Also: Delete All now makes everything except the free stuff disappear — every AI except Smiley is gone (Clippy, Byte, Liam, Scythe, Yuki).
- `0963` **SMILEY** *(matter-of-fact)* And Refresh (deletes everything) now truly starts you over with only the free apps + Smiley.

### v2.32 — YUKI DOES YOUR DIRTY WORK

_Tone: excited, announcer_

- `0964` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.32 - YUKI DOES YOUR DIRTY WORK: Yuki has no body now — he's one purple ball with horns and a tail (drag him off screen for the plain little ball form like Smiley).
- `0965` **SMILEY** *(excited, announcer)* Grab him and he snaps: "Hey dipshit, let me go." Park him in a corner and he turns Scythe-style with a name tag AND a Call button (or Call Yuki from the Phone) — then you two, him and Smiley, actually talk… and, honestly, they're kind of friends (they still beef after he wipes your PC).
- `0966` **SMILEY** *(excited, announcer)* He also helps now: spam call?
- `0967` **SMILEY** *(excited, announcer)* He walks up, pulls out an animated purple hand, and clicks the Block button for you ("Hey you actually need some.
- `0968` **SMILEY** *(excited, announcer)* Never mind.").
- `0969` **SMILEY** *(excited, announcer)* A hacker tries to get in?
- `0970` **SMILEY** *(excited, announcer)* "Hey dimshit, that's my job" — and he hacks the hacker instead.
- `0971` **SMILEY** *(excited, announcer)* He's also a SmileyTube video now, and if you have him he'll randomly take over any video you watch.
- `0972` **SMILEY** *(excited, announcer)* Also: call ScytheAI and there's a 40% chance she notices Yuki on your desktop — they argue angerily about both knowing Smiley.
- `0973` **SMILEY** *(excited, announcer)* Also: in admin mode, Smiley will randomly walk up and pet Yuki (happy bounce).
- `0974` **SMILEY** *(excited, announcer)* Also: type "Hey what are you two little lovebirds doing?" in Smiley's chat — in normal mode he says "Hey never mind.
- `0975` **SMILEY** *(excited, announcer)* It's just business, okay?"; in Liam mode they slowly fall for each other on the desktop (snail-slow speech bubbles: compliments, "love you," cheek kiss ).
- `0976` **SMILEY** *(excited, announcer)* Also: a new SmileyTube video — "Scythe Reviews: The Lovebirds" (Scythe narrates their whole love story).
- `0977` **SMILEY** *(excited, announcer)* Also: if you're watching a video, Yuki may interrupt with "Hey dipshit, we're trying to get some privacy in here." — he throws the YouTube page out and drags Smiley (and Scythe, if she's around) off screen (hearts float up); when Smiley comes back he says "My back is sore." Also: Smiley no longer copies the subtitles out loud while a YouTube video plays.
- `0978` **SMILEY** *(excited, announcer)* Also: if the mafia comes to break the screen, Yuki grabs the fist and rebuilds the screen — Smiley survives and keeps his apps.
- `0979` **SMILEY** *(excited, announcer)* Also: the Refresh (deletes everything) button on the main menu now actually works — it wipes your progress, uninstalls Yuki (find him again by searching "yuki"), and reinstalls every app fresh.
- `0980` **SMILEY** *(excited, announcer)* And Ainsley is now credited as the person who made ScytheAI (Credits button on the main menu).
- `0981` **SMILEY** *(excited, announcer)* Also: a hidden site "You Are An Idiot" (search it in the Browser) — download the "free software" and white + black smileys flood your screen till there's no speck left.
- `0982` **SMILEY** *(excited, announcer)* Smiley can't stop them.
- `0983` **SMILEY** *(excited, announcer)* Yuki can't stop them.
- `0984` **SMILEY** *(excited, announcer)* Nobody can.
- `0985` **SMILEY** *(excited, announcer)* When it corrupts your PC it says "Downloading virus.
- `0986` **SMILEY** *(excited, announcer)* Virus installed.
- `0987` **SMILEY** *(excited, announcer)* Good luck in hell.", breaks the screen and throws it off — and the only way out is to Refresh Everything.
- `0988` **SMILEY** *(excited, announcer)* Also: a new boot screen — the computer is built piece by piece ("memory okay", "saves okay", " has been woken up").
- `0989` **SMILEY** *(excited, announcer)* Also: a Picture Board app showing every character's real face (unlock all → crown + Photocopier badge).
- `0990` **SMILEY** *(excited, announcer)* Also: a brand-new game — Roblox!
- `0991` **SMILEY** *(excited, announcer)* Move the blocky noob, jump, and collect Robux on the green baseplate.

### v2.31 — YUKI

_Tone: ominous, low_

- `0992` **SMILEY** *(ominous, low)* `TITLE CARD` v2.31 - YUKI: search yuki in the Browser and the whole search engine turns purple.
- `0993` **SMILEY** *(ominous, low)* There's a new character in there — Yuki, a purple demon with horns, a tail and a gold star on his stomach, as detailed as Smiley and with his own moods (click him).
- `0994` **SMILEY** *(ominous, low)* Smiley begs: "I advise you to not do this.
- `0995` **SMILEY** *(ominous, low)* If you do, well, everything goes to hell." The Download button flickers like a flashing light.
- `0996` **SMILEY** *(ominous, low)* Press it and it says "Downloading virus.
- `0997` **SMILEY** *(ominous, low)* Good luck." over sharp, jagged music — then Yuki hacks EVERYTHING, deletes Smiley, deletes every single thing you have, and pops up: "hey dumbass.
- `0998` **SMILEY** *(ominous, low)* Nice job killing your own PC." After that he lives on your desktop: drag him into a corner to make him turn into his Scythe-style pet form with his name tag, or drag him off the screen to make him the little ball form like Smiley.

### v2.30 — THE REAL SMILEY, HEAD ONLY

_Tone: excited, announcer_

- `0999` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.30 - THE REAL SMILEY, HEAD ONLY: Smiley.org is now the exact Smiley you see on the computer — same yellow ball, same eyes, same smile, same everything.
- `1000` **SMILEY** *(excited, announcer)* No body, no arms, no legs, no antenna.
- `1001` **SMILEY** *(excited, announcer)* Every emotion is 1:1 accurate because it uses the real AI's own mood styles.
- `1002` **SMILEY** *(excited, announcer)* Cool mode now just puts on sunglasses (the same size as his real eyes, not smaller) and smirks.
- `1003` **SMILEY** *(excited, announcer)* The optional anatomy now shows what's inside the ball: skeleton, organs, and how he moves.

### v2.29 — SMILEY.ORG

_Tone: excited, announcer_

- `1004` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.29 - SMILEY.ORG: ALL EMOTIONS + ANATOMY: the final game now matches the REAL Smiley AI.
- `1005` **SMILEY** *(excited, announcer)* Trigger every emotion he has — Normal, Happy, Sad, Angry, Furious, Scared, Worried, Concerned, Cool and Hacked — plus Wave, Jump, Dance, Talk, Sleep and Spin.
- `1006` **SMILEY** *(excited, announcer)* Then open his anatomy if you want: his titanium skeleton, his organs (memory chip, emotion core, gyroscope, voice box, power cell, snack pouch), and how he moves.

### v2.28 — THE ARCADE

_Tone: excited, announcer_

- `1007` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.28 - THE ARCADE: search "games" in the Browser (it's NOT one of the quick links — you have to search it) to open the Arcade.
- `1008` **SMILEY** *(excited, announcer)* `SHOUT` It has FNAF-style Five Nights at Smiley's (slam the doors, survive to 6 AM, +$150), Smiley Clicker, and the FINAL game Smiley.org — where you see Smiley's WHOLE BODY and everything he does: wave, jump, dance, talk, sleep, get angry, spin.

### v2.27 — NO MORE SMASHING

_Tone: matter-of-fact_

- `1009` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.27 - NO MORE SMASHING: the screen-smashing and glass-shard repair are GONE (it got annoying).
- `1010` **SMILEY** *(matter-of-fact)* Giving the scammer your code now just robs you — he takes up to $250 — and Smiley scolds you.
- `1011` **SMILEY** *(matter-of-fact)* Refusing a call is always safe.
- `1012` **SMILEY** *(matter-of-fact)* Also: the music track picker (Cool Jazz / 3008's crunchy theme).

### v2.26 — CRUNCHY FRIDAY

_Tone: excited, announcer_

- `1013` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.26 - CRUNCHY FRIDAY: Settings now has a music track picker.
- `1014` **SMILEY** *(excited, announcer)* Pick "Cool Jazz" or the new "3008's Friday theme, except it's CRUNCHY" — a distorted chiptune loop.
- `1015` **SMILEY** *(excited, announcer)* Your choice is saved with your game.

### v2.25 — SAFE REFUSALS

_Tone: matter-of-fact_

- `1016` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.25 - SAFE REFUSALS: refusing the spam caller is safe — they yell and hang up.
- `1017` **SMILEY** *(matter-of-fact)* NEVER give them your code; if you do, they'll rob you.

### v2.24 — CREDITS + SMILEY'S CREATOR BADGE

_Tone: excited, announcer_

- `1018` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.24 - CREDITS + SMILEY'S CREATOR BADGE: new Credits button on the main menu (and Start menu) showing the owner Liam, the helpers Ainsley and J, and DeepSeek, the AI that helped.
- `1019` **SMILEY** *(excited, announcer)* New badge "Smiley's Creator" — go into Admin mode (593), open Phone, text the scammer and send 523.
- `1020` **SMILEY** *(excited, announcer)* He grants OWNER permissions: you're now on Liam's account ( shown in Achievements).

### v2.23 — ACHIEVEMENTS + FAN ART

_Tone: excited, announcer_

- `1021` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.23 - ACHIEVEMENTS + FAN ART: brand-new Achievements app (free, permanent — survives refresh AND Clear Memory) with badges and unlock pop-ups.
- `1022` **SMILEY** *(excited, announcer)* Brand-new Fan Art app for $5 with 8 detailed community art pieces (including an accurate Smiley and Scythe).
- `1023` **SMILEY** *(excited, announcer)* Phone Ban List now shows every banned caller with Unban buttons.

### v2.22 — SPAM CALL LOCKDOWN

_Tone: matter-of-fact_

- `1024` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.22 - SPAM CALL LOCKDOWN: answering a call now connects you to a REAL person who demands your admin number.
- `1025` **SMILEY** *(matter-of-fact)* `SHOUT` Refuse and they scream "GIVE IT TO ME NOW!!!" - refuse again and they give up and hang up.
- `1026` **SMILEY** *(matter-of-fact)* Plus: the Phone app has a proper Ban List (with Unban buttons), banning now really sticks, and the Admin panel has "Ban all calls" and "Clear ban list" buttons.

### v2.21 — SmileyTube Update Special

_Tone: excited, announcer_

- `1027` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.21 - SmileyTube Update Special: 4 new reviews (The Update Board, The Suggestion Box, Build-Your-Buddy) — and this board got a trailer system.
- `1028` **SMILEY** *(excited, announcer)* `SHOUT` Your buddy is now a HAND-MADE ball: blinks, looks around, opens his jaw to talk, hops when poked.

### v2.20 — The Great Wall Pile-Up Fix

_Tone: matter-of-fact_

- `1029` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.20 - The Great Wall Pile-Up Fix: the pets layer was zero-sized, so every AI's % coordinates resolved to zero — the whole gang piled at the wall.
- `1030` **SMILEY** *(matter-of-fact)* The layer now fills the desktop; they land where you see them.

### v2.19 — Corner Move + The Follow Crew

_Tone: excited, announcer_

- `1031` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.19 - Corner Move + The Follow Crew: Smiley's home is now the bottom-right corner, right next to the Put Down button.
- `1032` **SMILEY** *(excited, announcer)* Every AI (Clippy, Byte, Liam, Scythe, your custom buddy) trails him everywhere — wandering, dragged, cursor-follow, back home.

### v2.18 — Cinematic mafia death

_Tone: ominous, low_

- `1033` **SMILEY** *(ominous, low)* `TITLE CARD` v2.18 - Cinematic mafia death: the man SQUEEZES Smiley to crush him (fingers clench, thumb closes), blood splatters, then the broken screen SLIDES OFF revealing a burger grill scene with flickering flames and rising smoke.
- `1034` **SMILEY** *(ominous, low)* Smiley's death is now fully animated.

### v2.17 — Mafia aftermath deepened

_Tone: ominous, low_

- `1035` **SMILEY** *(ominous, low)* `TITLE CARD` v2.17 - Mafia aftermath deepened: Smiley dies with a BLOOD SPLATTER burst, the pixel hand is much bigger, the mafia takes ALL your apps (you have nothing until you reinstall, just like Smiley), and reviving him brings everything back with a mixed reaction - overjoyed to be alive, then MAD at you.
- `1036` **SMILEY** *(ominous, low)* Fixed: burger cash no longer caps at $10k (couldn't afford both), blocking alerts replaced with inline messages.

### v2.16 — MAFIA FEATURE

_Tone: ominous, low_

- `1037` **SMILEY** *(ominous, low)* `TITLE CARD` v2.16 - MAFIA FEATURE: call the mafia in Phone for $5,000 (owe $6,000 in 10 min).
- `1038` **SMILEY** *(ominous, low)* Don't pay?
- `1039` **SMILEY** *(ominous, low)* `SHOUT` A pixel hand breaks the screen, grabs Smiley, he screams "WHAT THE FUCK DID YOU DO" and gets crushed to death.
- `1040` **SMILEY** *(ominous, low)* Sell burgers to earn a new computer ($10,000) + Installer ($500) to bring him back.
- `1041` **SMILEY** *(ominous, low)* Admin panel has a "Trigger Mafia" button.
- `1042` **SMILEY** *(ominous, low)* New SmileyTube warning video.
- `1043` **SMILEY** *(ominous, low)* Fixed: burger cash no longer caps at $10k (couldn't afford both), blocking alerts replaced with inline messages.
- `1044` **SMILEY** *(ominous, low)* Mobile popups shrunk to 78vw x 34vh (were huge).

### v2.15 — CRITICAL screen fix

_Tone: matter-of-fact_

- `1045` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.15 - CRITICAL screen fix: Smiley was rendering off-screen and invisible (a CSS detail rule accidentally set him to "position: relative", pushing him 763px below the fold and making the page scroll).
- `1046` **SMILEY** *(matter-of-fact)* Now absolute-positioned and locked on-screen.
- `1047` **SMILEY** *(matter-of-fact)* Also: saves now actually persist across refresh (Windows Edition, bans, hats, suggestions survive - a wipe-on-load bug was deleting them before they could load), and desktop clips to the screen.

### v2.14 — Deep computer detail pass

_Tone: matter-of-fact_

- `1048` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.14 - Deep computer detail pass: layered desktop with noise + vignette, glassy bevelled icons that lift on hover, glass window frames with pretty custom scrollbars, glossy taskbar + polished clock/start button, rounded start menu with slide hover, refined boot screen (glowing logo, spinner, shadowed console).

### v2.13 — Hats are now HAND-MADE (CSS-drawn, no emoji)

_Tone: excited, announcer_

- `1049` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.13 - Hats are now HAND-MADE (CSS-drawn, no emoji): top hat with brim, blue cap, wide-brim cowboy, mortarboard grad with swinging tassel, safety helmet, knit beanie with pom — each with its own float animation.
- `1050` **SMILEY** *(excited, announcer)* Bug fixes: mitt hands verified working (thumb nub, no emoji), removed dead hatband rule, removed duplicate keyframe.

### v2.12 — Smiley & hand mega-update

_Tone: excited, announcer_

- `1051` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.12 - Smiley & hand mega-update: 20 hand gestures (wave, thumbs, point, flip, clap, high-five, fist bump, peace, shrug, rock-on, OK, muscle, pray, snap, jazz hands, heart, salute, money, sleepy) each with its own hand animation — clap/shrug/pray/jazz/heart use BOTH hands.
- `1052` **SMILEY** *(excited, announcer)* Gesture picker grid inside the Smiley AI app.
- `1053` **SMILEY** *(excited, announcer)* Custom mitt hands (no pointy emoji), cool two-part wave, per-gesture timing.

### v2.11 — Big bug/detail pass

_Tone: matter-of-fact_

- `1054` **SMILEY** *(matter-of-fact)* `TITLE CARD` v2.11 - Big bug/detail pass: animated hats for ALL six (top hat sways, cap wiggles, cowboy tips, grad bounces with tassel, helmet steadies, beanie squashes + sparkles).
- `1055` **SMILEY** *(matter-of-fact)* Richer computer: detailed wallpaper, glowing hover icons, glass windows, gradient taskbar.
- `1056` **SMILEY** *(matter-of-fact)* Fixed: renderBody no longer crashes on closed windows (was breaking ban + shop refresh), caller bans now persist after refresh, removed dead code, boot screen gets a live progress bar.
- `1057` **SMILEY** *(matter-of-fact)* Verified: all 91 buttons wired, no console errors, no undefined text in any app.

### v2.10 — Drag Smiley off screen and he vanishes until you open his app. The other AIs notice and react.

_Tone: excited, announcer_

- `1058` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.10 - Drag Smiley off screen and he vanishes until you open his app.
- `1059` **SMILEY** *(excited, announcer)* The other AIs notice and react.

### v2.9 — Bug squash + features

_Tone: excited, announcer_

- `1060` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.9 - Bug squash + features: ban callers for good, taller/resizable game window, animated wallpapers (Aurora/Grid/Stars), Smiley can break out of the screen, pets hang out in the put-down room, sip the coffee.

### v2.8 — Future Update box

_Tone: excited, announcer_

- `1061` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.8 - Future Update box: players submit ideas; admins see "Future Feature Pitch" and read what everyone wants.

### v2.7 — Scythe vs Smiley LIVE FIGHT

_Tone: excited, announcer_

- `1062` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.7 - Scythe vs Smiley LIVE FIGHT: a real animated brawl on live cam — punches, impact stars, camera shake.
- `1063` **SMILEY** *(excited, announcer)* SmileyTube now has 20 videos.

### v2.6 — Scythe rescue arc

_Tone: excited, announcer_

- `1064` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.6 - Scythe rescue arc: drag her apology note into a corner to undo everything.
- `1065` **SMILEY** *(excited, announcer)* She gets a white cowboy hat app — talk to her, or move her onto the desktop where she and Smiley argue constantly.

### v2.5 — ScytheAI revealed as Smiley's ex (gunslinging outlaw, not a yeehaw caricature). Call her in the Phone for a live divorce fight. Starter cash bumped to $5,000.

_Tone: excited, announcer_

- `1066` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.5 - ScytheAI revealed as Smiley's ex (gunslinging outlaw, not a yeehaw caricature).
- `1067` **SMILEY** *(excited, announcer)* Call her in the Phone for a live divorce fight.
- `1068` **SMILEY** *(excited, announcer)* Starter cash bumped to $5,000.

### v2.4 — ScytheAI hunts the web

_Tone: excited, announcer_

- `1069` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.4 - ScytheAI hunts the web: "she deletes files; and she's eyeing yours."

### v2.3 — Ansly finally got ScytheAI (reviewed, 1 star, we're doomed). Scythe run takes Smiley + Installer, ends on cyan.

_Tone: excited, announcer_

- `1070` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.3 - Ansly finally got ScytheAI (reviewed, 1 star, we're doomed).
- `1071` **SMILEY** *(excited, announcer)* Scythe run takes Smiley + Installer, ends on cyan.

### v2.2 — Rival pets move in

_Tone: excited, announcer_

- `1072` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.2 - Rival pets move in: paperclip Clippy, blue-eyed Byte, beatboxing purple Liam.
- `1073` **SMILEY** *(excited, announcer)* They argue, steal Game Boys, get trashed with secret endings.
- `1074` **SMILEY** *(excited, announcer)* SmileyTube hits 12 videos.
- `1075` **SMILEY** *(excited, announcer)* 5932727 super-code.
- `1076` **SMILEY** *(excited, announcer)* Silent Put Down, random hellos.

### v2.1 — He waits when you leave his screen

_Tone: excited, announcer_

- `1077` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.1 - He waits when you leave his screen: "are you making a new update?" Full history below.

### v2.0 — Update video (thinker Smiley on bricks), Paint beret doll, Slides suit uniform.

_Tone: excited, announcer_

- `1078` **SMILEY** *(excited, announcer)* `TITLE CARD` v2.0 - Update video (thinker Smiley on bricks), Paint beret doll, Slides suit uniform.

### v1.9 — Cat ears replace the furry suit. Ultra goes precious-normal. Test Room + dev mode + outside lab. Mail quest unlocks dev. Censor mode.

_Tone: excited, announcer_

- `1079` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.9 - Cat ears replace the furry suit.
- `1080` **SMILEY** *(excited, announcer)* Ultra goes precious-normal.
- `1081` **SMILEY** *(excited, announcer)* Test Room + dev mode + outside lab.
- `1082` **SMILEY** *(excited, announcer)* Mail quest unlocks dev.
- `1083` **SMILEY** *(excited, announcer)* Censor mode.

### v1.8 — SmileyTube reviews, talking ghost story, wave-back radar, quiet-smile rule, silent admin freebies, infinite money toggle.

_Tone: excited, announcer_

- `1084` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.8 - SmileyTube reviews, talking ghost story, wave-back radar, quiet-smile rule, silent admin freebies, infinite money toggle.

### v1.7 — Firewall + Swiper-blocking, hostile whiteout hacks, Steam Support rescue, scam texts hunting 593, $1M Ultra, 2727 backdoor, DIY custom commands.

_Tone: excited, announcer_

- `1085` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.7 - Firewall + Swiper-blocking, hostile whiteout hacks, Steam Support rescue, scam texts hunting 593, $1M Ultra, 2727 backdoor, DIY custom commands.

### v1.6 — Installer + Trash apps, paywalled desktop, Buy Infinite, elite HACK commands, Verity rework (real BSOD, angry, remembers count), jazz music, talk blips, role greetings.

_Tone: excited, announcer_

- `1086` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.6 - Installer + Trash apps, paywalled desktop, Buy Infinite, elite HACK commands, Verity rework (real BSOD, angry, remembers count), jazz music, talk blips, role greetings.

### v1.5 — Phone + spam calls (answer = corruption), E for existential dread, bank loans + magic words, Terminal HACK MODE, obeyed commands.

_Tone: excited, announcer_

- `1087` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.5 - Phone + spam calls (answer = corruption), E for existential dread, bank loans + magic words, Terminal HACK MODE, obeyed commands.

### v1.4 — Say VERITY five times

_Tone: excited, announcer_

- `1088` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.4 - Say VERITY five times: explosion, crash, "Valuable AI gone."

### v1.3 — Hats, whole-computer Ultra detail. Crown and gold removed forever. Admin lives at 593 in the Terminal.

_Tone: excited, announcer_

- `1089` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.3 - Hats, whole-computer Ultra detail.
- `1090` **SMILEY** *(excited, announcer)* Crown and gold removed forever.
- `1091` **SMILEY** *(excited, announcer)* Admin lives at 593 in the Terminal.

### v1.2 — Paint + Slides with uniforms, cursor following, fake cash, Games app, $9,000 refund file.

_Tone: excited, announcer_

- `1092` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.2 - Paint + Slides with uniforms, cursor following, fake cash, Games app, $9,000 refund file.

### v1.1 — Boot-style vault, Settings detail levels (low, normal, ultra).

_Tone: excited, announcer_

- `1093` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.1 - Boot-style vault, Settings detail levels (low, normal, ultra).

### v1.0 — Mood brain + offline AI chat. Make him furious and he takes ROOT and deletes your computer.

_Tone: excited, announcer_

- `1094` **SMILEY** *(excited, announcer)* `TITLE CARD` v1.0 - Mood brain + offline AI chat.
- `1095` **SMILEY** *(excited, announcer)* Make him furious and he takes ROOT and deletes your computer.

### v0.9 — Self-aware

_Tone: excited, announcer_

- `1096` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.9 - Self-aware: watches your mouse, reads your typing.
- `1097` **SMILEY** *(excited, announcer)* Sad, concerned, angry.
- `1098` **SMILEY** *(excited, announcer)* Pop-up left hand.

### v0.8 — Delete ending goes dark

_Tone: ominous, low_

- `1099` **SMILEY** *(ominous, low)* `TITLE CARD` v0.8 - Delete ending goes dark: "File was corrupted." / "???
- `1100` **SMILEY** *(ominous, low)* Reboot."

### v0.7 — Closable pop-ups. Double-click Smiley, find Delete. Delete him, meet blue screen.

_Tone: excited, announcer_

- `1101` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.7 - Closable pop-ups.
- `1102` **SMILEY** *(excited, announcer)* Double-click Smiley, find Delete.
- `1103` **SMILEY** *(excited, announcer)* Delete him, meet blue screen.

### v0.6 — Real animated body

_Tone: excited, announcer_

- `1104` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.6 - Real animated body: moods, blinking, waddling.
- `1105` **SMILEY** *(excited, announcer)* Arms and shoes came and went.
- `1106` **SMILEY** *(excited, announcer)* Round ball forever.

### v0.5 — Corner rules + free roam. Say VERITY for blue screen + demonic Smiley. Don't.

_Tone: excited, announcer_

- `1107` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.5 - Corner rules + free roam.
- `1108` **SMILEY** *(excited, announcer)* Say VERITY for blue screen + demonic Smiley.
- `1109` **SMILEY** *(excited, announcer)* Don't.

### v0.4 — Smiley AI desktop pet arrives (Canito-style buddy + browser helper). Press C to chat.

_Tone: excited, announcer_

- `1110` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.4 - Smiley AI desktop pet arrives (Canito-style buddy + browser helper).
- `1111` **SMILEY** *(excited, announcer)* Press C to chat.

### v0.3 — Fake computer desktop

_Tone: excited, announcer_

- `1112` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.3 - Fake computer desktop: boot, Files, Mail, Terminal, Browser, and a locked Vault (4277).

### v0.2 — Got a face

_Tone: excited, announcer_

- `1113` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.2 - Got a face: eyes, a smile, and corners to live in.

### v0.1 — Just a wire. A circle with no face. The dream begins.

_Tone: excited, announcer_

- `1114` **SMILEY** *(excited, announcer)* `TITLE CARD` v0.1 - Just a wire.
- `1115` **SMILEY** *(excited, announcer)* A circle with no face.
- `1116` **SMILEY** *(excited, announcer)* The dream begins.

