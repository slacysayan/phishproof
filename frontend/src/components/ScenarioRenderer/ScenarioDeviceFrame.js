import React from 'react';
import SMSBubble from './SMSBubble';
import UPIScreen from './UPIScreen';
import WhatsAppChat from './WhatsAppChat';
import CallTranscript from './CallTranscript';
import EmailViewer from './EmailViewer';
import FakeWebsite from './FakeWebsite';

export const ScenarioDeviceFrame = ({ type, content, highlight = false, targets = [] }) => {
  const render = () => {
    switch (type) {
      case 'sms': return <SMSBubble content={content} highlight={highlight} targets={targets} />;
      case 'upi': return <UPIScreen content={content} highlight={highlight} targets={targets} />;
      case 'whatsapp': return <WhatsAppChat content={content} highlight={highlight} targets={targets} />;
      case 'call': return <CallTranscript content={content} highlight={highlight} targets={targets} />;
      case 'email': return <EmailViewer content={content} highlight={highlight} targets={targets} />;
      case 'website': return <FakeWebsite content={content} highlight={highlight} targets={targets} />;
      default: return <div className="p-6 text-white/70 text-center text-sm">Scenario loading...</div>;
    }
  };
  return (
    <div
      className="rounded-[32px] bg-[rgba(255,255,255,0.16)] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)] p-2 backdrop-blur-[12px]"
      data-testid="scenario-device-frame"
    >
      <div className="rounded-[24px] overflow-hidden bg-[rgba(0,0,0,0.45)] border border-white/10">
        {render()}
      </div>
    </div>
  );
};

export default ScenarioDeviceFrame;
