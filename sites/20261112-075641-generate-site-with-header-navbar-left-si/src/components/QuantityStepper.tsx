interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  itemName: string;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ value, onChange, itemName, min = 1, max = 99 }: QuantityStepperProps) {
  return (
    <div className='stepper' role='group' aria-label={'Quantity of ' + itemName}>
      <button
        type='button'
        aria-label={'Decrease quantity of ' + itemName}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2.600' strokeLinecap='round' aria-hidden='true' focusable='false'>
          <path d='M6 12h12' />
        </svg>
      </button>
      <span className='stepper-value' aria-live='polite' aria-atomic='true'>
        {value}
      </span>
      <button
        type='button'
        aria-label={'Increase quantity of ' + itemName}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2.600' strokeLinecap='round' aria-hidden='true' focusable='false'>
          <path d='M6 12h12M12 6v12' />
        </svg>
      </button>
    </div>
  );
}
