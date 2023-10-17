'use client';
import { Button } from '@mui/material';
import { Component } from 'react';
import Image from 'next/image';

function refreshPage() {
  window.location.reload();
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="padding-layout-1 flex flex-col items-center justify-center gap-5 min-h-screen">
          <Image
            src="/assets/images/error.svg"
            alt="Error"
            width={500}
            height={500}
            className="w-1/2 sm:w-1/4"
            priority
          />
          <div className="title font-medium mt-10">
            Oops, something went wrong!
          </div>
          <Button
            variant="contained"
            className="bg-primary-main"
            onClick={refreshPage}>
            Reload Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
