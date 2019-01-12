# A/B Testing with React
Video: https://www.youtube.com/watch?v=FsKlL8EE9pQ&t=1455s
Slides: https://www.slideshare.net/IsabelaMoreira21/ab-testing-with-react

## Intro
Imagine this: You're working on this awesome app and you're almost ready to ship. You're showing off the app one final time before launch and someone asks "Why don't we make this button blue instead of green? I think more users will click on it!". Hmm... if only there was a way to scientifically determine that green is the superior color for this design...

## Why A/B testing?
- The biggest problem with design is that it's very subjective. Sure, there's guidelines and "proven" ways to organize and present your data, but there's rarely methods set in stone for the little details, like "should this button be green or blue? should we use this icon or that icon?". 
- Instead of relying on your gut (or whatever the head design thinks is the right approach), A/B testing a great way to make data-driven decisions, removing emotion from the picture and focusing on chosing the best design for the user. It lets you test different versions of a piece of UI and measure how successful each version is.
- By performing these experiments on the users directly, you'll have a pretty good idea of what the customer response will be once you choose the final design and release it into the wild. This will optimize for user engagement and success! 
- Usually you'll want to A/B test small components of your design, not the entire design itself. For example, we won't want to A/B test two completely different layouts, because then we won't know what specific part of those layouts resulting in better or worse user experience. A better use of A/B testing is if we have a few different designs for one particular piece of UI and we want a data-driven decision for which design to pick. So if we had an icon menu and we were trying to decide which icon is best for our "Store" button, we could use A/B testing to experiment with a few different icons and let the data decide which is best.

## Tips for A/B testing
- Choose something significantly different to A/B test. For example, don't A/B test whether a certain text in the UI should have a comma. Test things like calls to action, forms, images, colors, etc.
- Don't test just for the sake of testing! If a feature is already getting the user engagement you need (ex: 99% click conversions), find something to test that will bring more value than that missing 1%.
- Test your variants at the same time. Running the variants sequentially means that the user base could be different, so the data could be skewed.

## Setup
1. ```npx create-react-app my-ab-app```
2. ```npm install --save @marvelapp/react-ab-test```

## Steps
1. Create a component for the UI we'll be A/B testing.
2. Create standard layout (the "control" for the experiment).
3. Import and setup the react-ab-test emitter
4. Wrap the components you need in the Experiment and Variant tags. Note: the entire component may not need to be wrapped, but it might make sense to in some cases.
5. The variant we picked is stored in localstorage, so it persists across page refreshes. We can see this when we go to the Application > Storage section in our dev tools.  To test to our experiment is running, we can refresh with storage cleared, or clear from the Application > Clear Storage tab. We can enable our debugging view to switch between variants so we can tweak the UI without having to rely on the experiment selecting the right variant.
5. Now we need to determine what our "win" condition is. Let's say, in our current page, a win is when the user clicks the "Learn more" button. So on button click, we want to emit a win for the current experiment.
6. Now we're tracking these wins locally. But what we actually want to do is upload our wins to some telemetry tracking platform so we can figure out which variant in our experiment wins overall, so we can actually make a design decision.
7. We do this by choosing a platform. For this demo, we'll use Mixpanel, but you can also use X, Y, Z, for example.
8. ```npm install --save mixpanel```
9. We import the package at the top, like normal, then set it up with our app's token: ```var mixpanel = Mixpanel.init('YOUR_TOKEN');```
10. Now in our win condition, we log to Mixpanel that the current variant has "won" ```mixpanel.track(experimentName + " " + variantName, {
        name: experimentName,
        variant: variantName,
    });```
