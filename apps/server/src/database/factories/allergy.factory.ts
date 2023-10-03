import { define } from 'typeorm-seeding';
import { Allergy } from '../../modules/allergy/allergy.entity';
import { AllergySeverity } from '@allergy-management/models';
import { randBoolean, randParagraph, randUrl, randWord } from '@ngneat/falso';

const allergySeverity = [
  AllergySeverity.DEATH,
  AllergySeverity.LIFE_THREATENING,
  AllergySeverity.MILD,
  AllergySeverity.MODERATE,
  AllergySeverity.SEVERE,
];

define(Allergy, () => {
  const name = randWord();
  const symptoms = ['headache', 'nausea', 'vomiting'];
  const severity =
    allergySeverity[Math.floor(Math.random() * allergySeverity.length)];
  const image = randUrl();
  const notes = randParagraph();
  const isHighRisk = randBoolean();

  const allergy = new Allergy();
  allergy.name = name;
  allergy.symptoms = symptoms;
  allergy.severity = severity;
  allergy.isHighRisk = isHighRisk;
  allergy.image = image;
  allergy.notes = notes;

  return allergy;
});
