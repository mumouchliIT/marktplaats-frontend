import React from "react";

type Props = {
  onBack: () => void;
};

const PrivacyPage = ({ onBack }: Props) => {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 800 }}>
      <h1>Privacyverklaring</h1>

      <p>
        Deze applicatie verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening
        Gegevensbescherming (GDPR). In deze verklaring wordt uitgelegd welke gegevens worden verwerkt
        en met welk doel.
      </p>

      <h2>Welke gegevens worden verwerkt</h2>
      <p>
        De applicatie verwerkt gegevens die door de gebruiker zelf worden ingevoerd, zoals titel,
        categorie en locatie van een listing. Daarnaast worden technische gegevens verwerkt die nodig
        zijn om de applicatie correct te laten functioneren.
      </p>

      <h2>Doel van de gegevensverwerking</h2>
      <p>
        De gegevens worden uitsluitend gebruikt om de functionaliteit van de applicatie mogelijk te
        maken. Optionele gegevensverwerking, zoals analytics, wordt alleen uitgevoerd na expliciete
        toestemming van de gebruiker.
      </p>

      <h2>Cookies en toestemming</h2>
      <p>
        De applicatie maakt gebruik van noodzakelijke cookies en opslag om basisfunctionaliteit te
        leveren. Voor optionele cookies, zoals analytics of marketing, wordt toestemming gevraagd via
        een cookie banner. Deze keuze kan op elk moment worden aangepast of ingetrokken.
      </p>

      <h2>Bewaartermijn</h2>
      <p>
        Toestemming wordt lokaal opgeslagen in de browser van de gebruiker en kan door de gebruiker
        zelf worden verwijderd of aangepast via de privacy instellingen.
      </p>

      <h2>Rechten van de gebruiker</h2>
      <p>
        Gebruikers hebben het recht om hun toestemming in te trekken en inzicht te krijgen in welke
        gegevens worden verwerkt. Omdat deze applicatie geen accounts gebruikt, vindt verwerking
        uitsluitend lokaal plaats.
      </p>

      <button onClick={onBack} style={{ marginTop: 20 }}>
        Terug
      </button>
    </div>
  );
};

export default PrivacyPage;
