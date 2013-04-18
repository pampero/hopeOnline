using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using CreateExcelFile;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace HopeLingerieServices.Services.Utils
{
    public class ExcelUtils
    {

        /// <summary>
        /// Write excel file of a list of object as T
        /// Assume that maximum of 24 columns 
        /// </summary>
        /// <typeparam name="T">Object type to pass in</typeparam>
        /// <param name="fileName">Full path of the file name of excel spreadsheet</param>
        /// <param name="objects">list of the object type</param>
        /// <param name="sheetName">Sheet names of Excel File</param>
        /// <param name="headerNames">Header names of the object</param>
        public  void Create<T>(
            string fileName,
            List<T> objects,
            string sheetName,
            List<string> headerNames)
        {
            //Open the copied template workbook. 
            using (SpreadsheetDocument myWorkbook = SpreadsheetDocument.Create(fileName, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = myWorkbook.AddWorkbookPart();
                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();

                // Create Styles and Insert into Workbook
                WorkbookStylesPart stylesPart = myWorkbook.WorkbookPart.AddNewPart<WorkbookStylesPart>();
                Stylesheet styles = new CustomStylesheet();
                styles.Save(stylesPart);

                string relId = workbookPart.GetIdOfPart(worksheetPart);

                Workbook workbook = new Workbook();
                FileVersion fileVersion = new FileVersion { ApplicationName = "Microsoft Office Excel" };
                
                SheetData sheetData = CreateSheetData<T>(objects, headerNames, stylesPart);
                Worksheet worksheet = new Worksheet();

                //PageMargins pageM = worksheet.GetFirstChild<PageMargins>();

                //SheetProtection sheetProtection = new SheetProtection();
                //sheetProtection.Sheet = true;
                //sheetProtection.Objects = true;
                //sheetProtection.Scenarios = true;

                ////add column C:Z to allow edit range, which means column A,B and after Z are locked
                //ProtectedRanges pRanges = new ProtectedRanges();
                //ProtectedRange pRange = new ProtectedRange();
                //ListValue<StringValue> lValue = new ListValue<StringValue>();
                //lValue.InnerText = "D1:Z1048576";
                //pRange.SequenceOfReferences = lValue;
                //pRange.Name = "AllowEditRange1";
                //pRanges.Append(pRange);

                //worksheet.InsertBefore(sheetProtection, pageM);
                //worksheet.InsertBefore(pRanges, pageM);


                int numCols = headerNames.Count;
                int width = headerNames.Max(h => h.Length) + 5;

                Columns columns = new Columns();
                for (int col = 0; col < numCols; col++)
                {

                    Column c = CreateColumnData((UInt32)col + 1, (UInt32)numCols + 1, width);
                   
                    if (col == 0)
                    {
                        c.Hidden = BooleanValue.FromBoolean(true);
                    }
                    
                    columns.Append(c);
                }
                worksheet.Append(columns);

                Sheets sheets = new Sheets();
                Sheet sheet = new Sheet { Name = sheetName, SheetId = 1, Id = relId };
                sheets.Append(sheet);
                workbook.Append(fileVersion);
                workbook.Append(sheets);                

                worksheet.Append(sheetData);
                worksheetPart.Worksheet = worksheet;
                worksheetPart.Worksheet.Save();


                myWorkbook.WorkbookPart.Workbook = workbook;
                myWorkbook.WorkbookPart.Workbook.Save();
                myWorkbook.Close();
            }
        }

        private SheetData CreateSheetData<T>(List<T> objects, List<string> headerNames, WorkbookStylesPart stylesPart)
        {
            SheetData sheetData = new SheetData();

            if (objects != null)
            {
                //Fields names of object
                List<string> fields = GetPropertyInfo<T>();

                var az = new List<Char>(Enumerable.Range('A', 'Z' - 'A' + 1).Select(i => (Char) i).ToArray());
                List<Char> headers = az.GetRange(0, fields.Count);

                int numRows = objects.Count;
                int numCols = fields.Count;
                Row header = new Row();
                int index = 1;
                header.RowIndex = (uint) index;
                for (int col = 0; col < numCols; col++)
                {
                    //Cell c = CreateHeaderCell(headers[col].ToString(), headerNames[col], index, stylesPart.Stylesheet);
                    HeaderCell c = new HeaderCell(headers[col].ToString(), headerNames[col], index,
                                                  stylesPart.Stylesheet, System.Drawing.Color.DodgerBlue, 12, true);
                    header.Append(c);
                }
                sheetData.Append(header);

                CultureInfo ci = new CultureInfo("en-US");

                for (int i = 0; i < numRows; i++)
                {
                    index++;
                    var obj1 = objects[i];
                    var r = new Row {RowIndex = (uint) index};

                    for (int col = 0; col < numCols; col++)
                    {
                        string fieldName = fields[col];
                        PropertyInfo myf = obj1.GetType().GetProperty(fieldName);
                        if (myf != null)
                        {
                            object obj = myf.GetValue(obj1, null);
                            if (obj != null)
                            {
                                if (obj.GetType() == typeof (string))
                                {
                                    // Cell c = CreateTextCell(headers[col].ToString(), obj.ToString(), index);
                                    TextCell c = new TextCell(headers[col].ToString(), obj.ToString(), index);
                                    r.Append(c);
                                }
                                else if (obj.GetType() == typeof (bool))
                                {
                                    string value = (bool) obj ? "Yes" : "No";
                                    //Cell c = CreateTextCell(headers[col].ToString(), value, index);
                                    TextCell c = new TextCell(headers[col].ToString(), value, index);
                                    r.Append(c);
                                }
                                else if (obj.GetType() == typeof (DateTime))
                                {
                                    //string value = GetExcelSerialDate((DateTime) obj).ToString();
                                    string value = ((DateTime) obj).ToOADate().ToString(ci);

                                    // stylesPart.Stylesheet is retrieved reference for the appropriate worksheet.
                                    //Cell c = CreateDateCell(headers[col].ToString(), value, index, stylesPart.Stylesheet);
                                    DateCell c = new DateCell(headers[col].ToString(), (DateTime) obj, index);
                                    r.Append(c);
                                }
                                else if (obj.GetType() == typeof (decimal))
                                {
                                    //Cell c = CreateDecimalCell(headers[col].ToString(), obj.ToString(), index, stylesPart.Stylesheet);
                                    FormatedNumberCell c = new FormatedNumberCell(headers[col].ToString(),
                                                                                  ((decimal) obj).ToString(ci), index);
                                    r.Append(c);
                                }
                                else if (obj.GetType() == typeof (double))
                                {
                                    //Cell c = CreateDecimalCell(headers[col].ToString(), obj.ToString(), index, stylesPart.Stylesheet);
                                    FormatedNumberCell c = new FormatedNumberCell(headers[col].ToString(),
                                                                                  ((double) obj).ToString(ci), index);
                                    r.Append(c);
                                }
                                else
                                {
                                    long value;
                                    if (long.TryParse(obj.ToString(), out value))
                                    {
                                        //Cell c = CreateIntegerCell(headers[col].ToString(), obj.ToString(), index);
                                        NumberCell c = new NumberCell(headers[col].ToString(), value.ToString(ci), index);
                                        r.Append(c);
                                    }
                                    else
                                    {
                                        //Cell c = CreateTextCell(headers[col].ToString(), obj.ToString(), index);
                                        TextCell c = new TextCell(headers[col].ToString(), obj.ToString(), index);

                                        r.Append(c);
                                    }
                                }
                            }
                        }
                    }

                    sheetData.Append(r);
                }
            }
            return sheetData;
        }

        private Cell CreateIntegerCell(string header, string text, int index)
        {
            Cell c = new Cell();
            c.DataType = CellValues.Number;
            c.CellReference = header + index;

            CellValue v = new CellValue();
            v.Text = text;
            c.AppendChild(v);
            return c;
        }

        private Cell CreateDecimalCell(string header, string text, int index, Stylesheet styles)
        {
            Cell c = new Cell();
            c.DataType = CellValues.Number;
            c.CellReference = header + index;
            UInt32Value fontId = CreateFont(styles, "Arial", 11, false, System.Drawing.Color.Black);
            UInt32Value fillId = CreateFill(styles, System.Drawing.Color.White);
            UInt32Value formatId = CreateCellFormat(styles, fontId, fillId, 171);
            c.StyleIndex = formatId;

            CellValue v = new CellValue();
            v.Text = text;
            c.AppendChild(v);
            return c;
        }

        private Cell CreateFomulaCell(string header, string formula, int index, Stylesheet styles)
        {
            Cell c = new Cell();
            c.DataType = CellValues.Number;
            c.CellReference = header + index;
            UInt32Value fontId = CreateFont(styles, "Arial", 11, false, System.Drawing.Color.Black);
            UInt32Value fillId = CreateFill(styles, System.Drawing.Color.White);
            UInt32Value formatId = CreateCellFormat(styles, fontId, fillId, 171);
            c.StyleIndex = formatId;

            CellFormula f = new CellFormula();
            f.CalculateCell = true;
            f.Text = formula;
            c.Append(f);

            CellValue v = new CellValue();
            c.AppendChild(v);
            return c;
        }


        private Cell CreateDateCell(string header, string text, int index, Stylesheet styles)
        {
            Cell c = new Cell();
            c.DataType = CellValues.Date;
            c.CellReference = header + index;

            UInt32Value fontId = CreateFont(styles, "Arial", 11, false, System.Drawing.Color.Black);
            UInt32Value fillId = CreateFill(styles, System.Drawing.Color.White);
            UInt32Value formatId = CreateCellFormat(styles, fontId, fillId, 14);
            c.StyleIndex = formatId;

            CellValue v = new CellValue();
            v.Text = text;
            c.CellValue = v;


            return c;
        }

        private Cell CreateTextCell(string header, string text, int index)
        {
            
            //Create a new inline string cell.
            Cell c = new Cell();
            c.DataType = CellValues.InlineString;
            c.CellReference = header + index;
            
            //Add text to the text cell.
            InlineString inlineString = new InlineString();
            Text t = new Text();
            t.Text = text;
            inlineString.AppendChild(t);
            c.AppendChild(inlineString);
            return c;
        }

        private Cell CreateHeaderCell(string header, string text, int index, Stylesheet styles)
        {
            //Create a new inline string cell.
            Cell c = new Cell();
            c.DataType = CellValues.InlineString;
            c.CellReference = header + index;
            Console.WriteLine(header + index);

            UInt32Value fontId = CreateFont(styles, "Arial", 12, true, System.Drawing.Color.Black);
            UInt32Value fillId = CreateFill(styles, System.Drawing.Color.ForestGreen);
            UInt32Value formatId = CreateCellFormat(styles, fontId, fillId, 0);
            c.StyleIndex = formatId;

            //Add text to the text cell.
            InlineString inlineString = new InlineString();
            Text t = new Text();
            t.Text = text;
            inlineString.AppendChild(t);
            c.AppendChild(inlineString);
            return c;
        }
        private List<string> GetPropertyInfo<T>()
        {
            
            PropertyInfo[] propertyInfos = typeof(T).GetProperties();
            // write property names
            return propertyInfos.Select(propertyInfo => propertyInfo.Name).ToList();
        }

        private Stylesheet CreateStylesheet()
        {
            var ss = new Stylesheet();

            var fts = new Fonts();
            var ftn = new FontName {Val = "Arial"};
            var ftsz = new FontSize {Val = 11};
            var ft = new DocumentFormat.OpenXml.Spreadsheet.Font {FontName = ftn, FontSize = ftsz};
            fts.Append(ft);
            fts.Count = (uint)fts.ChildElements.Count;


            var fills = new Fills();
            var fill = new Fill();
            var patternFill = new PatternFill {PatternType = PatternValues.None};
            fill.PatternFill = patternFill;
            fills.Append(fill);

            fill = new Fill();
            patternFill = new PatternFill {PatternType = PatternValues.Gray125};
            fill.PatternFill = patternFill;
            fills.Append(fill);

            fills.Count = (uint)fills.ChildElements.Count;

            var borders = new Borders();
            var border = new Border
                             {
                                 LeftBorder = new LeftBorder(),
                                 RightBorder = new RightBorder(),
                                 TopBorder = new TopBorder(),
                                 BottomBorder = new BottomBorder(),
                                 DiagonalBorder = new DiagonalBorder()
                             };
            borders.Append(border);
            borders.Count = (uint)borders.ChildElements.Count;

            var csfs = new CellStyleFormats();
            var cf = new CellFormat {NumberFormatId = 0, FontId = 0, FillId = 0, BorderId = 0};
            csfs.Append(cf);
            csfs.Count = (uint)csfs.ChildElements.Count;

            // dd/mm/yyyy is also Excel style index 14

            uint iExcelIndex = 164;
            var nfs = new NumberingFormats();
            var cfs = new CellFormats();

            cf = new CellFormat {NumberFormatId = 0, FontId = 0, FillId = 0, BorderId = 0, FormatId = 0};
            cfs.Append(cf);

            var nf = new NumberingFormat {NumberFormatId = iExcelIndex, FormatCode = "dd/mm/yyyy hh:mm:ss"};
            nfs.Append(nf);

            cf = new CellFormat
                     {
                         NumberFormatId = nf.NumberFormatId,
                         FontId = 0,
                         FillId = 0,
                         BorderId = 0,
                         FormatId = 0,
                         ApplyNumberFormat = true
                     };
            cfs.Append(cf);

            
            iExcelIndex = 165;
            nfs = new NumberingFormats();
            cfs = new CellFormats();

            cf = new CellFormat { NumberFormatId = 0, FontId = 0, FillId = 0, BorderId = 0, FormatId = 0 };
            cfs.Append(cf);

            nf = new NumberingFormat { NumberFormatId = iExcelIndex, FormatCode = "MMM yyyy" };
            nfs.Append(nf);

            cf = new CellFormat
            {
                NumberFormatId = nf.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = true
            };
            cfs.Append(cf);

            
            iExcelIndex = 170;
            nf = new NumberingFormat {NumberFormatId = iExcelIndex, FormatCode = "#,##0.0000"};
            nfs.Append(nf);
            cf = new CellFormat
                     {
                         NumberFormatId = nf.NumberFormatId,
                         FontId = 0,
                         FillId = 0,
                         BorderId = 0,
                         FormatId = 0,
                         ApplyNumberFormat = true
                     };
            cfs.Append(cf);

            // #,##0.00 is also Excel style index 4
            iExcelIndex = 171;
            nf = new NumberingFormat {NumberFormatId = iExcelIndex, FormatCode = "#,##0.00"};
            nfs.Append(nf);
            cf = new CellFormat
                     {
                         NumberFormatId = nf.NumberFormatId,
                         FontId = 0,
                         FillId = 0,
                         BorderId = 0,
                         FormatId = 0,
                         ApplyNumberFormat = true
                     };
            cfs.Append(cf);

            // @ is also Excel style index 49
            iExcelIndex = 172;
            nf = new NumberingFormat {NumberFormatId = iExcelIndex, FormatCode = "@"};
            nfs.Append(nf);
            cf = new CellFormat
                     {
                         NumberFormatId = nf.NumberFormatId,
                         FontId = 0,
                         FillId = 0,
                         BorderId = 0,
                         FormatId = 0,
                         ApplyNumberFormat = true
                     };
            cfs.Append(cf);

            nfs.Count = (uint)nfs.ChildElements.Count;
            cfs.Count = (uint)cfs.ChildElements.Count;

            ss.Append(nfs);
            ss.Append(fts);
            ss.Append(fills);
            ss.Append(borders);
            ss.Append(csfs);
            ss.Append(cfs);

            var css = new CellStyles();
            var cs = new CellStyle {Name = "Normal", FormatId = 0, BuiltinId = 0};
            css.Append(cs);
            css.Count = (uint)css.ChildElements.Count;
            ss.Append(css);

            var dfs = new DifferentialFormats {Count = 0};
            ss.Append(dfs);

            var tss = new TableStyles
                          {
                              Count = 0,
                              DefaultTableStyle = "TableStyleMedium9",
                              DefaultPivotStyle = "PivotStyleLight16"
                          };
            ss.Append(tss);

            return ss;
        }

        private static UInt32Value CreateCellFormat(
            Stylesheet styleSheet,
            UInt32Value fontIndex,
            UInt32Value fillIndex,
            UInt32Value numberFormatId)
        {
            CellFormat cellFormat = new CellFormat();

            if (fontIndex != null)
                cellFormat.FontId = fontIndex;

            if (fillIndex != null)
                cellFormat.FillId = fillIndex;

            if (numberFormatId != null)
            {
                cellFormat.NumberFormatId = numberFormatId;
                cellFormat.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            }

            styleSheet.CellFormats.Append(cellFormat);

            UInt32Value result = styleSheet.CellFormats.Count;
            styleSheet.CellFormats.Count++;
            return result;
        }

        private UInt32Value CreateFill(
            Stylesheet styleSheet,
            System.Drawing.Color fillColor)
        {
           

            PatternFill patternFill =
                new PatternFill(
                    new ForegroundColor()
                    {
                        Rgb = new HexBinaryValue()
                        {
                            Value =
                            System.Drawing.ColorTranslator.ToHtml(
                                System.Drawing.Color.FromArgb(
                                    fillColor.A,
                                    fillColor.R,
                                    fillColor.G,
                                    fillColor.B)).Replace("#", "")
                        }
                    });

            patternFill.PatternType = fillColor == 
                        System.Drawing.Color.White ? PatternValues.None : PatternValues.LightDown;

            Fill fill = new Fill(patternFill);

            styleSheet.Fills.Append(fill);

            UInt32Value result = styleSheet.Fills.Count;
            styleSheet.Fills.Count++;
            return result;
        }

        private UInt32Value CreateFont(
            Stylesheet styleSheet,
            string fontName,
            double? fontSize,
            bool isBold,
            System.Drawing.Color foreColor)
        {

            Font font = new Font();

            if (!string.IsNullOrEmpty(fontName))
            {
                FontName name = new FontName()
                {
                    Val = fontName
                };
                font.Append(name);
            }

            if (fontSize.HasValue)
            {
                FontSize size = new FontSize()
                {
                    Val = fontSize.Value
                };
                font.Append(size);
            }

            if (isBold == true)
            {
                Bold bold = new Bold();
                font.Append(bold);
            }


            Color color = new Color()
            {
                Rgb = new HexBinaryValue()
                {
                    Value =
                        System.Drawing.ColorTranslator.ToHtml(
                            System.Drawing.Color.FromArgb(
                                foreColor.A,
                                foreColor.R,
                                foreColor.G,
                                foreColor.B)).Replace("#", "")
                }
            };
            font.Append(color);

            styleSheet.Fonts.Append(font);
            UInt32Value result = styleSheet.Fonts.Count;
            styleSheet.Fonts.Count++;
            return result;
        }

        private Column CreateColumnData(UInt32 startColumnIndex, UInt32 endColumnIndex, double columnWidth)
        {
            Column column;
            column = new Column();

            column.Min = startColumnIndex;
            column.Max = endColumnIndex;
            column.Width = columnWidth;
            column.CustomWidth = true;
            return column;
        }

        private int GetExcelSerialDate(DateTime input)
        {
            int nDay = input.Day;
            int nMonth = input.Month;
            int nYear = input.Year;
                 // Excel/Lotus 123 have a bug with 29-02-1900. 1900 is not a
                // leap year, but Excel/Lotus 123 think it is...
                if (nDay == 29 && nMonth == 02 && nYear == 1900)
                    return 60;

                // DMY to Modified Julian calculatie with an extra substraction of 2415019.
                long nSerialDate =
                        (int)((1461 * (nYear + 4800 + (int)((nMonth - 14) / 12))) / 4) +
                        (int)((367 * (nMonth - 2 - 12 * ((nMonth - 14) / 12))) / 12) -
                        (int)((3 * ((int)((nYear + 4900 + (int)((nMonth - 14) / 12)) / 100))) / 4) +
                        nDay - 2415019 - 32075;

                if (nSerialDate < 60)
                {
                    // Because of the 29-02-1900 bug, any serial date 
                    // under 60 is one off... Compensate.
                    nSerialDate--;
                }

                return (int)nSerialDate;
           
        }

        public static string GetCellValue(string fileName, string sheetName, string addressName)
        {
            string value = null;

            using (SpreadsheetDocument document =
              SpreadsheetDocument.Open(fileName, false))
            {
                WorkbookPart wbPart = document.WorkbookPart;

                // Find the sheet with the supplied name, and then use that Sheet
                // object to retrieve a reference to the appropriate worksheet.
                Sheet theSheet = wbPart.Workbook.Descendants<Sheet>().
                  Where(s => s.Name == sheetName).FirstOrDefault();

                if (theSheet == null)
                {
                    throw new ArgumentException("sheetName");
                }

                // Retrieve a reference to the worksheet part, and then use its 
                // Worksheet property to get a reference to the cell whose 
                // address matches the address you supplied:
                WorksheetPart wsPart =
                  (WorksheetPart)(wbPart.GetPartById(theSheet.Id));
                Cell theCell = wsPart.Worksheet.Descendants<Cell>().
                  Where(c => c.CellReference == addressName).FirstOrDefault();

                // If the cell does not exist, return an empty string:
                if (theCell != null)
                {
                    value = theCell.InnerText;

                    // If the cell represents a numeric value, you are done. 
                    // For dates, this code returns the serialized value that 
                    // represents the date. The code handles strings and Booleans
                    // individually. For shared strings, the code looks up the 
                    // corresponding value in the shared string table. For Booleans, 
                    // the code converts the value into the words TRUE or FALSE.
                    if (theCell.DataType != null)
                    {
                        switch (theCell.DataType.Value)
                        {
                            case CellValues.SharedString:
                                // For shared strings, look up the value in the shared 
                                // strings table.
                                var stringTable = wbPart.
                                  GetPartsOfType<SharedStringTablePart>().FirstOrDefault();
                                // If the shared string table is missing, something is 
                                // wrong. Return the index that you found in the cell.
                                // Otherwise, look up the correct text in the table.
                                if (stringTable != null)
                                {
                                    value = stringTable.SharedStringTable.
                                      ElementAt(int.Parse(value)).InnerText;
                                }
                                break;

                            case CellValues.Boolean:
                                switch (value)
                                {
                                    case "0":
                                        value = "FALSE";
                                        break;
                                    default:
                                        value = "TRUE";
                                        break;
                                }
                                break;
                        }
                    }
                }
            }
            return value;
        }
    }


}
