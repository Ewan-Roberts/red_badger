# red_badger

Hey there!

I really enojoyed this one! 

I wanted to see how compact and contructor based I could make it. Unfortunately the compactness and this strategy came with some serious down sides below: 

Couple of things I would do to make this better

- Build it with a rest/socket end point so you can just hit it with command strings
- The schema_generator is very very reliant on the input data being exact
- The whole schema_generator function is not very nice, ie i++ in the loop is akward and returning this
- I really didn't need to make the rovers Promises 
- the this.move function is WAY too big, it should be split up to single functions
- Some of the code is just hard to read like the loop of deaths
- This is dire need of unit testing
- The NSEW direction check iterates the variable up and then back down, which is not smart
- Overall readability is over-complicated
- There is zero error checking
