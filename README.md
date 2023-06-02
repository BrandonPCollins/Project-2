# Project-2 - The Wizard's Tower

For our second project we were tasked with the creation of a web-page which interactive front-end capabilities in order to showcase a working grasp of HTML, CSS and Javascript all working in collusion with one another to deliver a dynamic experience for the user. To this end I created a basic "Choose Your Own Adventure" game, modelled on the Fighting Fantasy books written by Ian Livingston and Steve Jackson whic I adored during my formative years. 

The game operates in the vein of a classic Dungeon Crawler, prompting the player for the name and then giving them a choice of potential character classes. The chosen classes then allow for differing potential outcomes as they make their way up the 5 floors of the eponymous Wizard's Tower, facing trials and tribulations that may find them ending up as just anoter casuality of the notoriously deadly construction. 

To represent this upon their entrance to the tower, the player is provided with a health bar which they must preserve on their journey, or perish to the perils before them. The game is intentionally difficult in the vein of those classic adventure books, with the potential for one incorrect option leading to immediate death and forcing a restart. This creates a trial-and-error approach to gameplay, best seen in modern rpgs in the likes of the staggeringly influential *Souls'* series, but with its roots in classic adventure gaming. "Nintendo Hard" as it came to be known when first transferred to video games in the likes of *Ghosts and Goblins*. As a short game the site exists to provide the same interactive experience which was available through the those books I adored, whether the player is a lifelong fan like myself, or experiencing that style of gaming for the first time.

Equally, if not more importantly the game's development served as a great learning experience for myself in building a functional and interactive javascript game. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/b0da2585-642e-4d79-b092-b76aa513923e) 


## Features 

### Logo & Background 

Front and centre atop my website is the Wizard's Tower logo, immediately conveying to the user the site's identity. I designed the logo using the paint.net image editor, styling the text, applying the gradient and then placing the Wizard's hat stock image taken from [Vecteezy](https://www.vecteezy.com/vector-art/2514766-wizard-hat-piece). I tried to ensure everything about the logo presented a fantastical aesthetic, immediately connoting the kind of game the player was about to partake in. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/b66ad3f5-ce04-4018-a1c0-40472fcb97f6)

Advised in my first project to make use of a colour pallette generator, so I made use of Adobe's Colour Palette generator when picking the shades of my gradient to ensure they would be complementary shades, using the RGB values when applying the colours in paint.net. I went with a purple to orange gradient as the colours not only appealed to me, but held connotations of sunsent and dusk, which are magical liminal times which are often seen and wondrous which gelled well with the atmosphere I was trying to set for the website.

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/692d46dc-3ed1-4766-820c-a5a179aebbe0)

To compliment the Logo I went with the image of a starry sky taken from [Pexels](https://www.pexels.com/photo/stars-1257860/) which I cropped and manipulated to serve the purpose as a background. I wanted to reinforce the mystical and fantastical atmosphere of the game, and the common connnotation of wizards and star-gazing made this ideal as a background. Given more time I might have made a parralax background of the stars, but I deemed it superflouos to the main goal of the project and was thus not a high priority. 
![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/84c43d5e-9ab3-4b9a-b2ed-160e7ba0b280)


### Story Nodes 

Beneath the logo and centered within the screen is the div containing the dynamically updating story nodes pulled by the javascript. When the player first opens the page, the text will fade in, further heightening the mysticism inherit in the game, and then the player will be prompted to enter their name via a text box. Should the player try to advance without entering a name, an error alert is displayed.

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/24f37bb2-9dc6-4806-8427-9f726c9c8447) ![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/c68ee803-ef02-4794-bd85-6667b5451ef4)

On click of 'Venture Forth' submission button with a valid name entered the central text will update, and the text box will be replaced with a set of buttons. This prompts the player to choose a class which is then saved as a variable moving forward, granting them diverse options while traversing the tower.

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/18a3fb58-7312-4a38-a3d1-dcebc2040356)

Afer the player's class is chosen, the true journey begins as the various javascript functions activate and enter the player into the story node cycle. From there the story text and options will then update dynamically as the player progresses throughout the tower, allowing them to choose how they tackle the obstacles based on their own inclination and class options. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/82bb8b67-5ddb-4325-89fb-f9aacfcc3007)


### Health Bar 

The primary mechanic the player must track while they traverse the game is their health bar, represented in teh classic video game fashion as a horizontal green bar. The design intentionally evokes the health bars of early JRPGs such as Final Fantasy or Dragon Quest, and to any player with very basic video game literacy it will be immediately apparent what its purpose is.

The health bar is initially hidden for UI purposes until the player enters the first floor of the tower, upon which health bar will appear across the bottom of the screen in a very sleek sliding animation. The number in its centre displays the number of "hits" the player can sustain before death, and as the player loses health the bar updates dynamically based on the percentage of health the player has remaining. This serves as a strong and immediate visual indicator to the player as to how close they are to death. The further up the tension, there are some options which can immediately kill the player, forcing them to have to restart the game which they must learn to recognise and navigate through mutlitple attempts at the tower.

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/2e272b39-812b-4da8-8f1c-94108ff8950e)

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/f2b8ec45-3e3d-40fd-ae73-0d22e91c6dec)

### Victory Tracking 

If the player manages to conquer the Wizard's Tower they are rewarded with a counter telling them how many times they have beaten the tower in their current session, alongside the option to restart the game. This adds replayability function to the game without the need for the player to manually refresh the page, and gives them the chance to view all possible outcomes under the classes that they did not play. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/ca5f894b-c5ff-4d44-b0bf-f004fbd1531b)


### Further Development 

* Further expand on options and branching paths 

## Testing 

### Lighthouse Accesibility Review

The accesibility of the site was tested using Google Chrome's built-in lighthouse feature, where The Wizard's Tower scored highly in all metrics. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/105084b0-9052-475c-b0ee-80b65f513c03)

### Responsivity Testing 

Responsivity checked via https://ui.dev/amiresponsive, and by myself and others across several different platforms and devices. This was a major downfalll for me in my previous project and was something I was incredibly conscious of in making an effort to grow in my use of screen responsivity. 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/112d70c6-40f1-4202-8cd3-3b6246180cbe)

### Validator Testing 

* HTML Testing

The [W3C Validator](https://validator.w3.org/) returned no errors when analysing the site.
![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/4e6450b0-fb20-42cd-9f95-bd6ff82a9f45) 

* CSS Testing 

The [Jigsaw Validator](https://jigsaw.w3.org/) returned no errors when analysing the site.
![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/3eb4047f-b427-4c60-b0cb-afa1596aacf0)

* Javascript Testing 

The official [Jshint Validator](https://jshint.com/) returned no errors when analysing the Javascript. It returned the following metrics: 

![image](https://github.com/BrandonPCollins/Project-2/assets/131177569/5acae8f4-8f9e-477f-8189-0aacdcc3ecab)

# Deployment 

The site was deployed to GitHub pages using the following steps:

1) In the GitHub repository for the project I navigated to the Settings Tab.
2) Under the Code and Automation header I selected the Pages tab to open the Github Pages section.
3) Under Build and Deployment using the Source drop-down menu I select the Master Branch
4) Then after clicking save, Github provided the link to my completed deployed website.

The site is live and deployed through GitHub pages and can be found : [Here](https://brandonpcollins.github.io/Project-2/)

# Credits

Images from Pexels & Vecteezy

Color Wheel from Adobe Color 

Instumenal in learning how to process through a Choose your Own Adventure game in Javascript was this video from Web Dev Simplified. I expanded upon what they have shown enough to clearly make the work my own, but without this video it would have taken me far longer to get my feet on the ground in this project. 

[https://www.youtube.com/watch?v=TdMhQhIC9Bw&t=47s](https://www.youtube.com/watch?v=R1S_NhKkvGA&t=97s)
