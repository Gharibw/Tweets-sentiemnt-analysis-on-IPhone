package com.PG2.Kproducer;

import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileReader;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;

public class BufferedFileReader implements Runnable
{
    private final Logger LOGGER = Logger.getLogger(BufferedFileReader.class);
    private final Charset ENC = Charset.forName("UTF-8");
    private OutputStream outputStream = null;
    private String fileToRead;

    public BufferedFileReader(String file, OutputStream stream)
    {
        this.fileToRead = file;
        this.outputStream = stream;
    }

    public void run()
    {
        BufferedReader rd = null;
        BufferedWriter wd = null;
        try
        {
            try
            {
                rd = new BufferedReader(new FileReader(this.fileToRead));
                wd = new BufferedWriter(new OutputStreamWriter(
                    this.outputStream, ENC));
                int b = -1;
                LOGGER.debug("Reading stream");
                while ((b = rd.read()) != -1)
                {
                    wd.write(b);
                }
                LOGGER.debug("Reading DONE");
            }
            catch (FileNotFoundException ex)
            {
                LOGGER.fatal("File DOesn't Exist", ex);
                LOGGER.trace("", ex);
            }
            catch (IOException ex)
            {
                LOGGER.fatal("IO Error while reading file", ex);
                LOGGER.trace("", ex);
            }
            finally
            {
                try
                {
                    if (rd != null) rd.close();
                    if (wd != null) wd.close();
                }
                catch (IOException ex)
                {
                    LOGGER.fatal("IO Error while cleaning up", ex);
                    LOGGER.trace(null, ex);
                }
            }
        }
        catch (Exception ex)
        {
            LOGGER.fatal("Error while reading file", ex);
            LOGGER.trace("", ex);
        }
    }
}
