import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {BankDataForm} from './BankDataForm';
import {AccountDataForm} from './AccountDataForm';
import {EmployeeDataForm} from './EmployeeDataForm';
import {Confirmation} from './Confirmation';
import {AccountCreateInput} from '../../model/AccountCreateInput';
import {Account} from '../../model/Account';

const styles = (theme: any): any => ({
  root: {
    position: 'absolute',
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '20%',
    left: '20%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Bank Data', 'Account Data', 'Employee Data', 'Confirm'];
}

interface StateI {
  activeStep: number;
}

interface PropsI {
  handleChange(
    name: string,
  ): (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  data: AccountCreateInput;
  create(account: AccountCreateInput): Promise<Account>;
  close(): void;
  classes: any;
}

class AddAccountStepper extends React.Component<PropsI, StateI> {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const {activeStep} = this.state;
    const steps = getSteps();
    if (activeStep === steps.length - 1) {
      const {create, data, close} = this.props;
      create(data).then(() => close());
      return;
    }
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  getStepContent = (step: number) => {
    const {data, handleChange} = this.props;

    switch (step) {
      case 0:
        return (
          <BankDataForm
            bank={data.bank}
            branch={data.branch}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <AccountDataForm
            holder={data.holder}
            account_type={data.account_type}
            account_number={data.account_number}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <EmployeeDataForm
            name={data.name}
            employee_number={data.employee_number}
            handleChange={handleChange}
          />
        );
      case 3:
        return <Confirmation data={data} />;
      default:
        return 'Unknown step';
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const {classes} = this.props;
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
            <div>
              {this.getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const AddAccount = withStyles(styles)(AddAccountStepper);

export {AddAccount};
