import React from 'react';
import styled from 'styled-components';
import myLogo from "../assets/ja.jpg";

const StyledWrapper = styled.div`
    height: 100%;
    padding: 20px 10%;

    p {
        line-height: 2;
        text-align: justify;
    }

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const StyledTitle = styled.h2`
    letter-spacing: 1px;
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 0;
    height: 60px;
    padding: 15px 0;
`;

const StyledImg = styled.div`
    background-image: url(${({ logo }) => logo});
    width:400px;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
`;

const AboutMe = () => (
    <StyledWrapper>
        <StyledTitle>O mnie</StyledTitle>
        <p>Cześć nazywam się Agata Lipiak i właśnie trafiłeś na mojego bloga o programowaniu 😊</p>
        <StyledImg logo={myLogo} />
        <h4>Kilka słów o mnie:</h4>
        {' '}
        {/* eslint-disable-next-line max-len */}
        <p>Mam za sobą 27 wiosen, z wykształcenia jestem inżynierem chemikiem, inżynierem mechanikiem i po trochu inżynierem spawalnikiem. Moja przygoda z programowaniem zaczęła się rok temu i tak oto odnalazłam swoją pasję i zostałam Front-end Developerem 😉. W tej kwestii postanowiłam rozwijać się samodzielnie (bez żadnych studiów i bootcamp’ów – może dlatego, że miałam już dość podejścia i sposobu nauczania w szkołach). Mam szeroki wachlarz zainteresowań. Zaczynając od sportu - lubię grać w piłkę nożną (w zasadzie gram od dziecka), uwielbiam wszelkiego rodzaju sztuki walki, fitness i jazdę na nartach. Następnie mogłabym przejść do kulinarnych zainteresowań - od jakiegoś czasu razem z mężem warzymy piwo domowe, a to dlatego, że jesteśmy fanami piw kraftowych i pojawiamy się na wielu piwnych eventach. Bardzo lubię odwiedzać nowe restauracje i próbować nowych smaków (bez tego życie wydaje się uboższe). Mam po części artystyczną duszę – zawsze lubiłam rysować, ostatnio nawet powróciłam do rysowania, co mnie uspokaja i sprawia mi wiele satysfakcji. Oczywiście tak jak większość uwielbiam filmy, seriale i po części mogę siebie nazwać nerdem.</p>
        <h4>Kilka słów o blogu:</h4>
        {/* eslint-disable-next-line max-len */}
        <p> Założyłam tego bloga, aby dzielić się wiedzą z zakresu programowania i pomagać osobom początkującym, które uczą się aby zostać Front-end Developerem. Mój pomysł zrodził się, ponieważ sama przez to wszystko przechodziłam od początku i wiem jaka byłam przytłoczona tymi wszystkimi informacjami, kursami, technologiami. Mam zamiar przygotowywać wpisy, które będą Was przede wszystkim uczyć, wspierać i nakierowywać na właściwą drogę. Uważam, że wyznaczenie sobie ścieżki nauki jest niezbędne, aby nie zagubić się w tym gąszczu informacji. Przez długi czas miałam problem z wyobrażeniem sobie do czego dane zagadnienie jest mi potrzebne, nie potrafiłam tego zwizualizować, zgrać w całość. Aby dojść do zrozumienia pewnych kwestii musiało upłynąć sporo czasu, ale może to dlatego, że nie wszystkie źródła informacji do mnie przemawiały lub nie były w dość prosty sposób opisane. Spróbuje te zagadnienia wytłumaczyć na moim blogu, z przykładami, z którymi sama się zetknęłam i które w końcu pozwoliły mi zrozumieć. </p>
        <p>
            Blog został podzielony na dwie główne sekcje:
            {' '}
            <strong>Nauka</strong>
            , gdzie posty będą miały charakter edukacyjny i zostaną podzielone na kategorie według technologii/języków oraz
            {' '}
            <strong>Artykuły</strong>
            , gdzie znajdziecie nowości, ciekawostki a także porady.
            {' '}
        </p>
        {/* eslint-disable-next-line max-len */}
        <p> Blog został wykonany samodzielnie przeze mnie w technologii React, była to dla mnie spora dawka wiedzy nie tylko z zakresu front-endu ale również i back-endu 😉 Jeżeli zauważycie błędy to nie bójcie się pisać, w międzyczasie będę starała się ulepszać i doskonalić swoją stronę. </p>
        <p> Jeżeli masz pytania, napisz na email: al.zakoduj@gmail.com lub wyślij wiadomość na facebooku, chętnie odpowiem ! </p>

    </StyledWrapper>
);

export default AboutMe;
