import * as React from 'react';

export class Home extends React.Component {
    public render() {
        return <div>
            <h1>LuftKlar kundeservice</h1>
            <p>Velkommen til LuftKlar kundeservice.</p>
            <p>
                Vi er her for deg. Er det noe du lurer p&#229; ber vi deg lete gjennom v&#229;rt utvalg av sp&#248;rsm&#229;l eller ta kontakt via v&#229;rt kontaktskjema.
            </p>

            <br />
            <hr/>

            <h4>Oppgaven</h4>
            <p>Dette prosjektet er en obligatorisk oppgave i faget ITPE3200 - Webapplikasjoner. F&#248;lgende teknologier er brukt:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> og <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for serverside</li>
                <li><a href='https://facebook.github.io/react/'>React</a> og <a href='http://www.typescriptlang.org/'>TypeScript</a> for klientside</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for bygging og bundling av klientside-ressurser</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout og styling</li>
            </ul>
        </div>;
    }
}
