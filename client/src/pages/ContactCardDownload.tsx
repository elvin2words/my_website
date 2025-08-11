import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode } from 'lucide-react';
import QRCode from 'qrcode.react'; // npm install qrcode.react
import { saveAs } from 'file-saver'; // install file-saver

const contactInfo = {
  engineer: {
    name: 'Your Name',
    phone: '+1234567890',
    email: 'engineer@example.com',
    linkedin: 'https://linkedin.com/in/engineer',
  },
  designer: {
    name: 'Your Name',
    phone: '+1234567890',
    email: 'designer@example.com',
    portfolio: 'https://designerportfolio.com',
  },
  technopreneur: {
    name: 'Your Name',
    email: 'tech@example.com',
    website: 'https://technopreneur.com',
  },
  human: {
    email: 'human@example.com',
    socials: {
      twitter: 'https://twitter.com/human',
      instagram: 'https://instagram.com/human',
    }
  }
};

function generateVCard(info) {
  return `BEGIN:VCARD
VERSION:3.0
FN:${info.name}
TEL;TYPE=CELL:${info.phone || ''}
EMAIL:${info.email}
URL:${info.website || info.portfolio || ''}
END:VCARD`;
}

const ContactCardDownload: React.FC = () => {
  const [selectedIdentity, setSelectedIdentity] = useState<'engineer' | 'designer' | 'technopreneur' | 'human'>('engineer');
  const [showQR, setShowQR] = useState(false);

  const info = contactInfo[selectedIdentity];

  // vCard blob
  const vcardText = generateVCard(info);
  const vcardBlob = new Blob([vcardText], { type: 'text/vcard' });

  const handleDownload = () => {
    saveAs(vcardBlob, `${selectedIdentity}-contact.vcf`);
  };

  const qrValue = `MECARD:N:${info.name};TEL:${info.phone || ''};EMAIL:${info.email};URL:${info.website || info.portfolio || ''};;`;

  return (
    <section className="max-w-3xl mx-auto p-6 rounded-lg bg-gradient-to-r from-accent3 to-accent4 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Get My Contact Info</h2>

      <div className="flex justify-center space-x-6 mb-6">
        {['engineer', 'designer', 'technopreneur', 'human'].map((id) => (
          <button
            key={id}
            onClick={() => setSelectedIdentity(id as any)}
            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
              transition-transform transform hover:scale-110
              ${selectedIdentity === id ? 'bg-white text-accent3 font-bold' : 'bg-white/20'}`}
            aria-label={`Select ${id} contact`}
          >
            {id[0].toUpperCase()}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="mb-1 font-semibold">{info.name || 'Your Name'}</p>
        <p>{info.email}</p>
        {info.phone && <p>{info.phone}</p>}
        {(info.website || info.portfolio) && <a href={info.website || info.portfolio} target="_blank" rel="noreferrer" className="underline">{info.website || info.portfolio}</a>}
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={handleDownload} leftIcon={<Download />} variant="outline" className="text-white border-white hover:bg-white hover:text-accent3">
          Download vCard
        </Button>

        <Button onClick={() => setShowQR(!showQR)} leftIcon={<QrCode />} variant="outline" className="text-white border-white hover:bg-white hover:text-accent3">
          {showQR ? 'Hide QR' : 'Show QR Code'}
        </Button>

        {/* Web Share API button for supported browsers */}
        <ShareContactButton info={info} />
      </div>

      {showQR && (
        <div className="mt-6 flex justify-center">
          <QRCode value={qrValue} size={150} bgColor="transparent" fgColor="#fff" />
        </div>
      )}
    </section>
  );
};

const ShareContactButton: React.FC<{ info: any }> = ({ info }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${info.name}'s Contact Info`,
          text: `Contact details for ${info.name}`,
          url: info.website || info.portfolio || window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  return (
    <Button onClick={handleShare} leftIcon={<Share2 />} variant="outline" className="text-white border-white hover:bg-white hover:text-accent3">
      Share
    </Button>
  );
};

export default ContactCardDownload;
