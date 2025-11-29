// client/src/pages/Admin.tsx
// Admin Page for Content Management

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

import Header from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";

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
    <div className="container mx-auto py-10 max-w-5xl">
      <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
        <CardHeader>
          <CardTitle className="text-2xl font-poppins">Content Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label className="text-lg font-semibold text-accent2">Introduction</label>
            <Textarea 
              value={content.intro}
              onChange={(e) => setContent({...content, intro: e.target.value})}
              className="min-h-[100px] bg-white bg-opacity-5"
              placeholder="Enter introduction text..."
            />
          </div>
          
          <Separator className="my-6 bg-white bg-opacity-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(content).map(([key, value]) => (
              key !== 'intro' && (
                <div key={key} className="space-y-2">
                  <label className="text-lg font-semibold text-accent3">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Textarea
                    value={value}
                    onChange={(e) => setContent({...content, [key]: e.target.value})}
                    className="min-h-[150px] bg-white bg-opacity-5"
                    placeholder={`Enter ${key.toLowerCase()} content...`}
                  />
                </div>
              )
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} size="lg" className="bg-accent2 hover:bg-accent2/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
