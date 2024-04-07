import { RHFCheckbox } from 'src/components/hook-form';

export default function StepFour() {
  return (
    <>
      <RHFCheckbox
        name={`allBranches`}
        label="Avalible for All Branches" // Assuming your RHFCheckbox supports a label prop
      />
    </>
  );
}
