import os
import tkinter as tk
from tkinter import ttk, messagebox
import serial
import threading
import time
import serial.tools.list_ports

class SerialReaderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Serial Port Reader")

        # Serial Port dropdown
        self.port_label = ttk.Label(root, text="Serial Port:")
        self.port_label.grid(row=0, column=0, padx=10, pady=10)
        
        self.port_var = tk.StringVar()
        self.port_dropdown = ttk.Combobox(root, textvariable=self.port_var, state="normal")
        self.port_dropdown.grid(row=0, column=1, padx=10, pady=10)
        self.update_ports()

        # Baud Rate dropdown
        self.baud_label = ttk.Label(root, text="Baud Rate:")
        self.baud_label.grid(row=1, column=0, padx=10, pady=10)
        
        self.baud_var = tk.StringVar()
        self.baud_dropdown = ttk.Combobox(root, textvariable=self.baud_var, state="normal")
        self.baud_dropdown.grid(row=1, column=1, padx=10, pady=10)
        self.update_baud_rates()

        # Connect and Disconnect Buttons
        self.connect_button = ttk.Button(root, text="Connect", command=self.connect)
        self.connect_button.grid(row=2, column=0, columnspan=2, padx=10, pady=10)
        
        self.disconnect_button = ttk.Button(root, text="Disconnect", command=self.disconnect, state=tk.DISABLED)
        self.disconnect_button.grid(row=3, column=0, columnspan=2, padx=10, pady=10)
        
        # File Name Entry
        self.file_name_label = ttk.Label(root, text="File Name:")
        self.file_name_label.grid(row=4, column=0, padx=10, pady=10)
        
        self.file_name_entry = ttk.Entry(root)
        self.file_name_entry.grid(row=4, column=1, padx=10, pady=10)
        
        # Count Entry
        self.count_label = ttk.Label(root, text="Count:")
        self.count_label.grid(row=5, column=0, padx=10, pady=10)
        
        self.count_entry = ttk.Entry(root, validate="key")
        self.count_entry.grid(row=5, column=1, padx=10, pady=10)
        self.count_entry.insert(0, "0")
        
        # Clear and Save Buttons
        self.clear_button = ttk.Button(root, text="Clear", command=self.clear_output)
        self.clear_button.grid(row=6, column=0, padx=10, pady=10)
        
        self.output_text = tk.Text(root, width=50, height=15)
        self.output_text.grid(row=7, column=0, columnspan=2, padx=10, pady=10)
        
        self.save_button = ttk.Button(root, text="Save Output", command=self.save_output)
        self.save_button.grid(row=6, column=1, padx=10, pady=10)
        
        self.serial_port = None
        self.read_thread = None
        self.stop_reading = False

        # Initialize count
        self.count = 0

        # Create raw_rec directory if it doesn't exist
        if not os.path.exists("raw_rec"):
            os.makedirs("raw_rec")

    def update_ports(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        self.port_dropdown['values'] = ports
        if ports:
            self.port_var.set(ports[0])
        else:
            self.port_var.set("")

    def update_baud_rates(self):
        baud_rates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
        self.baud_dropdown['values'] = baud_rates
        self.baud_dropdown.set(baud_rates[9])  # Default to 115200

    def connect(self):
        port = self.port_var.get()
        baud_rate = self.baud_var.get()
        
        try:
            self.serial_port = serial.Serial(port, baud_rate)
            self.stop_reading = False
            self.read_thread = threading.Thread(target=self.read_serial)
            self.read_thread.start()
            
            self.connect_button.config(state=tk.DISABLED)
            self.disconnect_button.config(state=tk.NORMAL)
            messagebox.showinfo("Success", "Connected to serial port")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to connect to serial port: {e}")

    def disconnect(self):
        self.stop_reading = True
        if self.read_thread is not None:
            self.read_thread.join()
        
        if self.serial_port is not None:
            self.serial_port.close()
        
        self.connect_button.config(state=tk.NORMAL)
        self.disconnect_button.config(state=tk.DISABLED)
        messagebox.showinfo("Success", "Disconnected from serial port")

    def read_serial(self):
        while not self.stop_reading:
            if self.serial_port.in_waiting > 0:
                data = self.serial_port.readline().decode('utf-8').strip()
                self.output_text.insert(tk.END, data + '\n')
                self.output_text.see(tk.END)
            time.sleep(0.01)

    def save_output(self):
        file_name = self.file_name_entry.get().strip()
        if not file_name:
            messagebox.showwarning("Warning", "Please enter a file name")
            return

        # Ensure the file name is valid
        file_name = "".join(c for c in file_name if c.isalnum() or c in (' ', '_')).rstrip()
        if not file_name:
            file_name = "output"

        # Update the count from the entry widget
        try:
            count = int(self.count_entry.get().strip())
        except ValueError:
            messagebox.showwarning("Warning", "Please enter a valid integer for count")
            return

        file_path = os.path.join("raw_rec", f"{file_name}{count}.txt")
        with open(file_path, "w") as file:
            file.write(self.output_text.get("1.0", tk.END))
        messagebox.showinfo("Success", f"Output saved successfully as {file_path}")

        # Increment the count and update the entry widget
        self.count += 1
        self.count_entry.delete(0, tk.END)
        self.count_entry.insert(0, str(self.count))

    def clear_output(self):
        self.output_text.delete("1.0", tk.END)

if __name__ == "__main__":
    root = tk.Tk()
    app = SerialReaderApp(root)
    root.mainloop()
