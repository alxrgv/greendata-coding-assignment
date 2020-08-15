const itGrades = ["Junior", "Middle", "Senior"];
const developerTypes = ["Frontend", "Backend", "iOS", "Android"];
const analystGrades = ["Стажёр", "Младший", "Старший"];
const headAndAlternate = ["Руководитель", "Заместитель руководителя"];

function generateHeadAndAlternate(name: string) {
  return headAndAlternate.map((ha) => `${ha} ${name}`);
}

function generateDevelopers() {
  const mapped = itGrades.map((grade) =>
    developerTypes.map((developerType) => {
      return `${grade} ${developerType} разработчик`;
    })
  );

  return Array.prototype.concat.apply([], mapped);
}

function generateAnalysts() {
  return analystGrades.map((grade) => `${grade} аналитик`);
}

export const positions = [
  "Директор",
  "Заместитель директора",
  ...generateHeadAndAlternate("экономического отдела"),
  ...generateHeadAndAlternate("отдела маркетинга"),
  ...generateHeadAndAlternate("бухгалтерского отдела"),
  "Руководитель команды разработки",
  ...generateDevelopers(),
  ...generateAnalysts(),
];
