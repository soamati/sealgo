import React from "react";

function useGenerator<G extends Generator, S = ReturnType<G["next"]>["value"]>(
  factory: () => G,
  deps: unknown[]
) {
  const ref = React.useRef<G | null>(null);
  const [step, setStep] = React.useState<S | null>(null);
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    ref.current = factory();
    /* eslint-disable-next-line */
  }, [...deps]);

  const next = React.useCallback(() => {
    const generator = ref.current;
    if (!generator) return;

    const nextStep = generator.next().value;
    if (!nextStep) {
      setIsDone(true);
      return;
    }

    setStep(nextStep);
  }, []);

  const reset = React.useCallback(() => {
    ref.current = factory();
    setIsDone(false);
    setStep(null);
  }, [factory]);

  return { step, isDone, next, reset };
}

export default useGenerator;
