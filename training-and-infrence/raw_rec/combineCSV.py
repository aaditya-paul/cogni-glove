import csv
import os
import re
import pandas as pd
import glob

def combine_txt_files_in_directory(directory):
    # Get all .txt files in the directory
    txt_files = [f for f in os.listdir(directory) if f.endswith('.txt')]

    for txt_file in txt_files:
        input_file = os.path.join(directory, txt_file)
        # Create the output CSV file name by removing numbers from the base file name
        base_name = os.path.splitext(txt_file)[0]
        output_file_name = re.sub(r'\d+', '', base_name) + '.csv'
        output_file = os.path.join(directory, output_file_name)
        
        # Read the TXT file and combine all rows into a single list
        combined_data = []
        with open(input_file, 'r') as infile:
            reader = csv.reader(infile)
            for row in reader:
                # Filter out lines with unwanted text
                if any('Recording' in field for field in row):
                    continue
                
                # Remove trailing commas from each row
                if row and row[-1] == '':
                    row = row[:-1]
                combined_data.extend(row)
        
        # Append the base name (without numbers) as the last item
        combined_data.append(output_file_name[:-4])
        
        # Determine the number of columns for the header
        num_columns = len(combined_data)   # Subtract 1 for the appended base name
        header = list(range(1, num_columns + 1))
        
        # Write the combined data to the output file with the header
        with open(output_file, 'a', newline='') as outfile:
            writer = csv.writer(outfile)
            # Write the header row if the file is empty
            if os.stat(output_file).st_size == 0:
                writer.writerow(header)
            # Write the combined data row
            writer.writerow(combined_data)


def combine_csv_files(directory = ''):
    # Get all CSV files in the current directory
    csv_files = glob.glob(f'{directory}*.csv')
    
    if not csv_files:
        print("No CSV files found in the current directory.")
        return
    
    # Read and combine all CSV files
    combined_df = pd.concat([pd.read_csv(f) for f in csv_files], ignore_index=True)
    
    # Save the combined DataFrame to a new CSV file
    combined_df.to_csv('combined_output.csv', index=False)
    
    # Delete the original CSV files
    # for file in csv_files:
    #     os.remove(file)
    
    print(f"Combined {len(csv_files)} CSV files into 'combined_output.csv'")
    print("Original CSV files have been deleted.")



def add_header_to_csv(input_file, output_file):
    # Read the existing CSV file
    with open(input_file, 'r', newline='') as infile:
        reader = list(csv.reader(infile))
        n = len(reader[0])  # Number of columns
        
        # Create the new header
        header = list(map(str, range(n)))
        
        # Write the new header followed by the original content to the output file
        with open(output_file, 'w', newline='') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(header)  # Write the header
            writer.writerows(reader)  # Write the original content

def process_all_csv_in_folder(folder_path):
    # Iterate over all files in the directory
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            input_file = os.path.join(folder_path, filename)
            output_file = os.path.join(folder_path, 'processed_' + filename + ".csv")
            add_header_to_csv(input_file, output_file)
            print(f"Processed {filename} -> processed_{filename}")


# combine_txt_files_in_directory('.')
process_all_csv_in_folder('.')
combine_csv_files()