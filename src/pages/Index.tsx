
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import DeviceStatus from '@/components/DeviceStatus';
import SidebarButton from '@/components/SidebarButton';
import InfoField from '@/components/InfoField';
import ImageDisplay from '@/components/ImageDisplay';
import { api } from '@/services/api';

const Index = () => {
  const { toast } = useToast();
  
  // Application state
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<string>("");
  
  // Voucher data
  const [voucherData, setVoucherData] = useState({
    voucherNo: "",
    nation: "",
    micr: "",
    frontImage: null as string | null,
    backImage: null as string | null
  });

  // Check device status on component mount
  useEffect(() => {
    checkDeviceStatus();
  }, []);

  // Poll device status periodically
  useEffect(() => {
    const interval = setInterval(checkDeviceStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const checkDeviceStatus = async () => {
    try {
      const response = await api.getDeviceStatus();
      setIsDeviceConnected(response.connected);
    } catch (error) {
      setIsDeviceConnected(false);
      console.error("Error checking device status:", error);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setCurrentAction("Connecting to device...");
    
    try {
      const response = await api.connectDevice();
      
      if (response.success) {
        setIsDeviceConnected(true);
        toast({
          title: "Device Connected",
          description: "Successfully connected to the scanner device.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to the scanner device.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to the device.",
        variant: "destructive",
      });
      console.error("Error connecting to device:", error);
    } finally {
      setIsLoading(false);
      setCurrentAction("");
    }
  };

  const handleScanVoucher = async () => {
    if (!isDeviceConnected) {
      toast({
        title: "Device Not Connected",
        description: "Please connect the device before scanning.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentAction("Scanning voucher...");
    
    try {
      const response = await api.scanVoucher();
      setVoucherData(response);
      
      toast({
        title: "Scan Complete",
        description: `Voucher ${response.voucherNo} scanned successfully.`,
      });
    } catch (error) {
      toast({
        title: "Scan Error",
        description: "An error occurred while scanning the voucher.",
        variant: "destructive",
      });
      console.error("Error scanning voucher:", error);
    } finally {
      setIsLoading(false);
      setCurrentAction("");
    }
  };

  const handleSaveToDb = async () => {
    if (!voucherData.voucherNo) {
      toast({
        title: "No Data",
        description: "Please scan a voucher before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentAction("Saving to database...");
    
    try {
      const response = await api.saveToDatabase(voucherData);
      
      if (response.success) {
        toast({
          title: "Data Saved",
          description: `Voucher ${voucherData.voucherNo} saved to database.`,
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save voucher data to database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Save Error",
        description: "An error occurred while saving to the database.",
        variant: "destructive",
      });
      console.error("Error saving to database:", error);
    } finally {
      setIsLoading(false);
      setCurrentAction("");
    }
  };

  const handleExit = () => {
    // Simple reload for now, in a real app this might do cleanup first
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-scanner-background">
      {/* Header */}
      <header className="bg-scanner-primary text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">X100+ Voucher Scanner</h1>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-scanner-lightgray p-4 flex flex-col">
          <div className="mb-6">
            <DeviceStatus connected={isDeviceConnected} />
          </div>
          
          <div className="flex flex-col flex-1 space-y-2">
            <SidebarButton 
              onClick={handleConnect} 
              disabled={isLoading}
              className={isDeviceConnected ? "bg-scanner-connected/10 hover:bg-scanner-connected/20" : ""}
            >
              Connect
            </SidebarButton>
            
            <SidebarButton 
              onClick={handleScanVoucher} 
              disabled={!isDeviceConnected || isLoading}
            >
              Scan Voucher
            </SidebarButton>
            
            <SidebarButton 
              onClick={handleSaveToDb} 
              disabled={!voucherData.voucherNo || isLoading}
            >
              Save to DB
            </SidebarButton>
            
            <div className="flex-1"></div>
            
            <SidebarButton 
              onClick={handleExit} 
              className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 mt-auto"
            >
              Exit
            </SidebarButton>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {isLoading && (
            <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded">
              {currentAction}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column - Info fields */}
            <div>
              <InfoField 
                label="Voucher No." 
                value={voucherData.voucherNo || ""} 
              />
              <InfoField 
                label="Nation" 
                value={voucherData.nation || ""} 
              />
            </div>

            {/* Right column - Hidden MICR data */}
            <div className="hidden">
              <InfoField 
                label="MICR Data" 
                value={voucherData.micr || ""} 
              />
            </div>
          </div>

          {/* Image displays */}
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <ImageDisplay 
              label="Front" 
              imageData={voucherData.frontImage} 
            />
            <ImageDisplay 
              label="Back" 
              imageData={voucherData.backImage} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
