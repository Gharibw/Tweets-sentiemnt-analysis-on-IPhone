package com.PG2.Kproducer;

import org.apache.log4j.Logger;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Properties;
import java.nio.charset.Charset;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

public class KafkaProducer implements Runnable
{
    private static final Logger LOGGER = Logger.getLogger(KafkaProducer.class);
    private final Charset ENC = Charset.forName("UTF-8");
    private final String topic;

    private InputStream inputStream = null;

    public KafkaProducer(String topic, InputStream stream)
    {
        this.topic = topic;
        this.inputStream = stream;
    }

    public void run()
    {
        Properties props = new Properties();
        props.put("metadata.broker.list", "localhost:9092");
        props.put("serializer.class", "kafka.serializer.StringEncoder");
        props.put("producer.type", "async");
        ProducerConfig conf = new ProducerConfig(props);
        Producer<Integer, String> producer = null;
        BufferedReader rd = null;
        try
        {
            try
            {
                rd = new BufferedReader(
                    new InputStreamReader(this.inputStream, ENC));
                String line = null;
                LOGGER.debug("Producing messages");
                producer = new Producer<Integer, String>(conf);
                while ((line = rd.readLine()) != null)
                {
                    producer.send(new KeyedMessage<Integer, String>(
                        this.topic, line));
                }
                LOGGER.debug("Messages sent sucssessfully!");
            }
            catch (IOException ex)
            {
                LOGGER.fatal("Producing Message IO Error", ex);
                LOGGER.trace(null, ex);
            }
        }
        catch (Exception ex)
        {
            LOGGER.fatal("Message Producing Error", ex);
            LOGGER.trace(null, ex);
        }
        finally
        {
            try
            {
                if (rd != null) rd.close();
                if (producer != null) producer.close();
            }
            catch (IOException ex)
            {
                LOGGER.fatal("Error IO", ex);
                LOGGER.trace(null, ex);
            }
        }
    }
}
