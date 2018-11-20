# A/B Testing with React

## Setup
1. ```npx create-react-app my-ab-app```
2. ```npm install --save @marvelapp/react-ab-test```

## Steps
1. Create a stateless component for the UI we'll be A/B testing.
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