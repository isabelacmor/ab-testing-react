import React from 'react';
import './LandingPage.css';
import { Experiment, Variant, emitter, experimentDebugger } from '@marvelapp/react-ab-test';
import Mixpanel from 'mixpanel';
import secrets from '../secrets.json';

experimentDebugger.enable();
emitter.defineVariants('landingPageCTAExperiment', ['control', 'blue-variant', 'green-variant'], [34, 33, 33]);
var mixpanel = Mixpanel.init(secrets.mixpanelToken);

class LandingPage extends React.Component {
    onButtonClick(e) {
        emitter.emitWin('landingPageCTAExperiment');
    }

    render() {
        return (
            <div className="mainComponent">
                <header>
                    Doggo App
                </header>
                <div className="description">
                    Doggo ipsum wow such tempt borkf extremely cuuuuuute tungg stop it fren you are doing me the shock yapper, big ol h*ck waggy wags smol. Long bois dat tungg tho shoob doge doing me a frighten, long doggo tungg fluffer woofer, pupper shoob borkdrive. Heckin good boys shibe heckin very jealous pupper fat boi, thicc heckin good boys and girls. Bork smol what a nice floof long doggo, shibe doggorino. Very jealous pupper smol he made many woofs, boof.
                </div>
                <Experiment name='landingPageCTAExperiment'>
                    <Variant name='control'>
                        <button className="callToAction" onClick={this.onButtonClick}>Learn more</button>
                    </Variant>
                    <Variant name='blue-variant'>
                        <button className="callToAction blue" onClick={this.onButtonClick}>Learn more</button>
                    </Variant>
                    <Variant name='green-variant'>
                        <button className="callToAction green" onClick={this.onButtonClick}>Learn more</button>
                    </Variant>
                </Experiment>
            </div>
        );
    }
};

export default LandingPage;

// Called when the experiment is displayed to the user.
emitter.addPlayListener(function(experimentName, variantName) {
    console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
});


// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function(experimentName, variantName) {
    console.log(
        `Variant ${variantName} of experiment ${experimentName} was clicked`
    );
    mixpanel.track(experimentName + " " + variantName, {
        name: experimentName,
        variant: variantName,
    });
});