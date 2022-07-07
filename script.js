// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
  "|Hi there! My name is Cheeto!", 
  "| I'm a little kitty messenger that Zaid programmed to help deliver a special message to you hehe.", 
  "|He wanted to write it out himself but he knew he had to do something different this time.",
  "|Let me just check my notes here...",
  "|*checks aggressively*",
  "|Found it!",
  "|Ahem, he wanted to let you know that these last 2 years with you have been the best of his life. And although it was spent separated, he wouldn't change a thing!",
  "|Two years ago on this day, at 8pm (2pm for you) he met you. A beautiful girl who wanted a long term roleplay,  and so did he.",
  "|And here we are two years later-",
  "|That long term roleplay turned out to be a long term relationship hehe.",
  "|Through the many ups and downs in the relationship, he wants you to know that he'll always love you, no matter how hard things get.",
  "|Admittedly he was shy to make the first move all that time ago, and you were the one to do it lol. He thanks you for that.",
  "|He got to know so much about you. Your littlespace, your likes, your dislikes, your iced coffee order and so much more.",
  "|More importantly he got to know you as the person he loves today-",
  "|His adorable little princess who speaks out for what she believes in.",
  "|He could go on and on and so could I, but this is where Cheeto has to leave you :(",
  "|Bye bye *waves at you*",
  "|This last message is from Zaid himself",
  "|So here it is.",
  "|Hiii there pumpkin, just wanted to say happy anniversary for the first time we met hehe.",
  "|I only have one thing to ask.",
  "|I said I'd ask you again, so here goes-",
  "|Isabel...",
  "|Will You Marry Me?"
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
    speedWait = 1200, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 30; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("p"); //Subheader element
  
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function(){ typeWriter(id, ar); }, 50);
      
    }
  }
}