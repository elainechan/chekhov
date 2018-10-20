# Requirements

## Basic
- [ ] Create a client prototype that allows non-technical users to do something interesting or valuable with the API.
- [ ] Serve static files: The server, in addition to offering a REST API, will need to serve your client and any other static assets (for instance, images).
- [ ] Implement a REST API with all four CRUD operations: Your app idea will determine the content of what your API offers, but at a minimum, your app should support all four CRUD operations (create, read, update, delete).
- [ ] Comprehensive Tests for the API Layer: Each API endpoint should have test coverage. At a minimum that means having tests for the normal case — that means that if you had, say an account creation endpoint, you'd have a test that proves that when the endpoint gets a POST request with the correct data, a new account is created, and the expected response is returned.
- [ ] Use Continuous Integration: set up continuous integration early on in your development process.

## Presentation
- [ ] A description that explains what the app does, who it’s for, why you built it (this text should not be hidden behind a hover or click event)
- [ ] Skills used (what is the stack?)
- [ ] Compelling screenshot
- [ ] Link to GitHub repo
- [ ] Link to live, working app

## Code Quality
### General
- [ ] Does the code work? Does it perform its intended function, the logic is correct etc.
- [ ] Consistency through the file (attention to detail here)
	- Indentation (tabs vs spaces)
	- Font URLs (double vs single quotes)
	- Semicolons
- [ ] Are there tests throughout the code? 
- [ ] Is all the code easily understood? Is documentation needed?
- [ ] Do variable names describe what is stored in them?
- [ ] Does it conform to consistent code styling? (indentation, quotes, etc)
- [ ] Is it DRY? Is there any redundant or duplicate code?
- [ ] Can any global variables be replaced?
- [ ] Do loops have a set length and correct termination conditions? (No infinite loops)
- [ ] Can any logging or debugging code be removed?
- [ ] Do comments exist and describe the intent of the code?
- [ ] Are all functions commented?
- [ ] Is any unusual behavior or edge-case handling described? (is the author handling unexpected user behaviour)
- [ ] Is there any incomplete code? If so, should it be removed or flagged with a suitable marker like ‘TODO’?
### HTML
- [ ] using semantic HTML and avoiding “div soup?”
- [ ] wrapping all input elements in form tags?
- [ ] including alt tags on images and adhering to other accessibility best practices ([reference](http://a11yproject.com/checklist.html)) 
### CSS
- [ ] Class names should be descriptive 
- [ ] Never target elements with ID selectors
- [ ] Asset files should have clear names 
- [ ] Font-family should have fallback options via font stacks
- [ ] Prefixes should be used appropriately ([reference](https://github.com/postcss/autoprefixer))
- [ ] Hierarchy of element selectors should be clear 

### JS 
- [ ] Follow ES5/6 standards
- [ ] [Airbnb JS guide](https://github.com/airbnb/javascript)
- [ ] [ES5 deprecated](https://github.com/airbnb/javascript/tree/es5-deprecated/es5)
- [ ] Caching DOM elements in variables
- [ ] Avoid overly nested `if` statements
- [ ] Node: structuring the project in an clearly organized manner, consistent amongst all projects 
- [ ] React: use classes appropriately. (Sometimes you don’t need a react component, just use a plain vanilla function)



