import * as React from 'react';
import { Input, Form } from 'antd';

import './TitleField.less';

// default props
interface TitleFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
}
// non default props
export interface TitleFieldProps extends Partial<TitleFieldDefaultProps> {
  /** Callback for onChange */
  onChange?: (newValue: string) => void;
}

/**
 * Input field for the rule title.
 */
export class TitleField extends React.Component<TitleFieldProps> {

  public static defaultProps: TitleFieldDefaultProps = {
    label: 'Title',
    placeholder: 'Enter Rule Description (Title)'
  };

  /**
   * Extracts the text value of the ChangeEvent
   * and passes it to the passed in 'onChange' handler.
   */
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }

  render() {

    return (
      <div className="gs-rule-titlefield" >

        <Form.Item label={this.props.label} colon={false} >

          <Input
            className="gs-rule-titlefield-input"
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />

        </Form.Item>

      </div>
    );
  }
}

export default TitleField;
