import type { VercelRequest } from '@vercel/node';
import { ImageResponse } from '@vercel/og';
import React from 'react';
import { isAddress } from 'viem';

import addresses from '../addresses.json';

export const config = {
  runtime: 'edge',
};
export default function handler(request: VercelRequest): Response {
  try {
    if (!request.url) {
      return new Response(`Failed to generate the image`, {
        status: 400,
      });
    }
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const label = addresses[address];

    if (!address || !isAddress(address)) {
      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 44,
              backgroundImage:
                'linear-gradient(to bottom right, #0A0A0C, #17171E)',
              letterSpacing: -1,
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#EDEDED',
                fontSize: 48,
              }}
            >
              ContractScan
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#A1A1A1',
                fontSize: 32,
                gap: 4,
              }}
            >
              <div>Search deployed contracts</div>
              <div>across 100+ EVM chains</div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        },
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: 44,
            backgroundImage:
              'linear-gradient(to bottom right, #0A0A0C, #17171E)',
            letterSpacing: -1,
            fontWeight: 400,
            textAlign: 'center',
            padding: '64px 32px',
          }}
        >
          <div
            style={{
              color: '#A1A1A1',
              fontSize: 28,
            }}
          >
            ContractScan
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >
            <div
              style={{
                color: '#EDEDED',
                fontSize: 56,
                gap: 32,
              }}
            >
              {label}
            </div>
            <div
              style={{
                color: '#7B7B7B',
                background: '#1B1B1B',
                borderRadius: 8,
                fontSize: 40,
                padding: '4px 8px',
                fontFamily: 'monospace',
              }}
            >
              {address}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
