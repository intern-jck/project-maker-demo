export default function changeHandlerTest(event: React.ChangeEvent<HTMLSelectElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
};