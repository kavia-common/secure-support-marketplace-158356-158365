import React from 'react';
import { render, screen } from '@testing-library/react';

import DashboardUser from '../pages/dashboards/DashboardUser';
import DashboardListener from '../pages/dashboards/DashboardListener';

describe('Dashboards', () => {
  test('DashboardUser renders quick links', () => {
    render(<DashboardUser />);
    expect(screen.getByText(/your dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/book now/i)).toBeInTheDocument();
    expect(screen.getByText(/open messages/i)).toBeInTheDocument();
  });

  test('DashboardListener renders quick actions', () => {
    render(<DashboardListener />);
    expect(screen.getByText(/listener dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByText(/training/i)).toBeInTheDocument();
  });
});
