
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { toast } = useToast();
  const [content, setContent] = useState({
    intro: '',
    engineerDescription: '',
    developerDescription: '',
    designerDescription: '',
    technopreneurDescription: '',
    humanDescription: ''
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2">Intro Text</label>
            <Textarea 
              value={content.intro}
              onChange={(e) => setContent({...content, intro: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(content).map(([key, value]) => (
              key !== 'intro' && (
                <div key={key}>
                  <label className="block mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <Textarea
                    value={value}
                    onChange={(e) => setContent({...content, [key]: e.target.value})}
                  />
                </div>
              )
            ))}
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
