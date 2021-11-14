import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import classnames from 'classnames';

import './TextInput.scss';
import { SoftKeyConsumer, SoftKeyManagerProps} from '../SoftKey/withSoftKeyManager';


interface LocalProps{
  id?: string;
  focusClass?: string,
  label?: string,
  index?: number,
  onFocusChange?: (index: number) => void,
  forwardedRef?: any,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  enableTabSwitching?: boolean,
  onlyClickChange?: boolean,
  initialValue?: string,
  placeholder?: string,
  isNumeric?: boolean,
  validationError?: string
};
type Props = LocalProps & SoftKeyManagerProps;

const prefixCls = 'kai-text-input';

const TextInput = React.memo<Props>(
  props => {
    const {
      id,
      focusClass,
      label,
      index,
      onFocusChange,
      forwardedRef,
      onChange,
      enableTabSwitching,
      initialValue,
      placeholder,
      isNumeric,
      softKeyManager,
      onlyClickChange,
      validationError
    } = props;

  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const [value, setValue] = useState(initialValue||'');

  useEffect(() => {setValue(initialValue||'')}, [initialValue]);

  const handleKeyUp = (event) => {
    if (enableTabSwitching) {
      if (
        (event.key === 'ArrowLeft' && caretPosition !== 0) ||
        (event.key === 'ArrowRight' && caretPosition !== value.length)
      ) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }
    } else {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    setCaretPosition(event.target.selectionStart);
  };

  function setFoucsOnInputRef(){
    const input = ref.current;
    input.focus();
    // Without this, it will just focus at position 0
    requestAnimationFrame(() => {
      input.selectionStart = caretPosition;
    });
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    if(onChange) {
      onChange(event);
    }
  };

  const handleFocusChange = (foc: boolean) => {
    setIsFocused(foc);
    if (foc) {
      onFocusChange(index);
      if (onlyClickChange){
        softKeyManager.setCenterCallback(setFoucsOnInputRef);
      } else {
        setFoucsOnInputRef();
      }
    }
  };

  const errorCls = validationError ? `${prefixCls}-error` : '';
  const itemCls = classnames([
    prefixCls,
    isFocused && `${prefixCls}--focused ${(focusClass||'')}`,
    errorCls
  ]);
  const labelCls = `${prefixCls}-label p-thi`;
  const inputCls = `${prefixCls}-input p-pri`;

  return (
    <div
      ref={forwardedRef}
      id={id}
      tabIndex={0}
      className={itemCls}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      <label className={labelCls}>{validationError ? validationError : label}</label>
      <input
        ref={ref}
        type={isNumeric ? "tel": "text"}
        className={inputCls}
        onChange={handleChange}
        onKeyUpCapture={handleKeyUp}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
});

export default React.forwardRef((props:LocalProps, ref) => (
  <SoftKeyConsumer>
    {context => <TextInput softKeyManager={context} forwardedRef={ref} {...props} />}
  </SoftKeyConsumer>
));
