export default function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
};