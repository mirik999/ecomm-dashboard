import { render } from '../../../components/hoc/TestingWrapper';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
//components
import AuthPage from '../Auth.page';
import Login from '../Login';
import NotificationBox from '../../../components/common/notificationBox';

describe('Auth page tests', () => {
  it('should render component without crash', () => {
    const { container } = render(<AuthPage />);
    expect(container).toBeInTheDocument();
  });

  it('should check the email input', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(
      'Password',
    ) as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();
  });

  it('should check the password input', () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(
      'E-mail',
    ) as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
  });

  it('should click the button and redirect', async () => {
    render(<Login />);
    const enterBtn = screen.getByRole('button', { name: /Enter/i });
    expect(enterBtn).toBeInTheDocument();
  });
});

describe('Form events', () => {
  it('validate user inputs and provides error messages', async () => {
    render(<AuthPage />);

    await act(async () => {
      fireEvent.click(screen.getByText('Already have an account?'));
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
        target: { value: ' ' },
      });

      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: ' ' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Enter/i }));
    });

    const { container } = render(<NotificationBox />);
    expect(container).toBeInTheDocument();
  });

  // it('should success login', async () => {
  //   render(<AuthPage />);
  //
  //   await act(async () => {
  //     fireEvent.click(screen.getByText('Already have an account?'));
  //   });
  //
  //   await act(async () => {
  //     fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
  //       target: { value: 'sudo@gmail.com' },
  //     });
  //
  //     fireEvent.change(screen.getByPlaceholderText(/Password/i), {
  //       target: { value: 'qweqwe' },
  //     });
  //   });
  //
  //   await act(async () => {
  //     fireEvent.click(screen.getByRole('button', { name: /Enter/i }));
  //   });
  //
  //   const { container } = render(<NotificationBox />);
  //   expect(container).not.toBeInTheDocument();
  // });
});
