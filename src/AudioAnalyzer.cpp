#include <iostream>
#include <sstream>
#include <chrono>
#include <thread>
#include "AudioAnalyzer.h"

#include "../superpowered/Superpowered/Superpowered.h"
#include "../superpowered/Superpowered/SuperpoweredAnalyzer.h"
#include "../superpowered/Superpowered/SuperpoweredDecoder.h"
#include "../superpowered/Superpowered/SuperpoweredSimple.h"

namespace AudioAnalyzer
{
    AudioAnalyzer::AudioAnalyzer(Napi::Function &callback)
        : AsyncWorker(callback)
    {
        Superpowered::Initialize(
            "ExampleLicenseKey-WillExpire-OnNextUpdate",
            true,  // enableAudioAnalysis (using SuperpoweredAnalyzer, SuperpoweredLiveAnalyzer, SuperpoweredWaveform or SuperpoweredBandpassFilterbank)
            false, // enableFFTAndFrequencyDomain (using SuperpoweredFrequencyDomain, SuperpoweredFFTComplex, SuperpoweredFFTReal or SuperpoweredPolarFFT)
            false, // enableAudioTimeStretching (using SuperpoweredTimeStretching)
            false, // enableAudioEffects (using any SuperpoweredFX class)
            true,  // enableAudioPlayerAndDecoder (using SuperpoweredAdvancedAudioPlayer or SuperpoweredDecoder)
            false, // enableCryptographics (using Superpowered::RSAPublicKey, Superpowered::RSAPrivateKey, Superpowered::hasher or Superpowered::AES)
            false  // enableNetworking (using Superpowered::httpRequest)
        );

        returnString = "";
    };

    // Do the stuff here
    void AudioAnalyzer::Execute()
    {
        std::string inFile = "C:\\Users\\mithu\\source\\repos\\musicalkey\\src\\test1.mp3";

        Superpowered::Decoder *decoder = new Superpowered::Decoder();

        // Parse all ID3 Frames to get ID3 information
        if (decoder->open(inFile.c_str()) != Superpowered::Decoder::OpenSuccess)
        {
            returnString = "Can't parse audio file";
        }
        else
        {
            decoder->parseAllID3Frames(true, 10000);

            // Get the file location, title, artist, album, and duration of audio file
            std::string aFileLocation = inFile;
            std::string aTitle = (decoder->getTitle() == NULL) ? "N/A" : decoder->getTitle();
            std::string aArtist = (decoder->getArtist() == NULL) ? "N/A" : decoder->getArtist();
            std::string aAlbum = (decoder->getAlbum() == NULL) ? "N/A" : decoder->getAlbum();
            double AudioDurationSec = decoder->getDurationSeconds();

            std::stringstream ss;
            ss << "File Location: " << aFileLocation << "\n"
               << "Title: " << aTitle << "\n"
               << "Artist: " << aArtist << "\n"
               << "Album: " << aAlbum << "\n"
               << "Length: " << AudioDurationSec << "\n";

            returnString = ss.str();
        }

        // // Create the analyzer.
        Superpowered::Analyzer *analyzer = new Superpowered::Analyzer(decoder->getSamplerate(), (int)decoder->getDurationSeconds());

        // Create a buffer for the 16-bit integer audio output of the decoder.
        short int *intBuffer = (short int *)malloc(decoder->getFramesPerChunk() * 2 * sizeof(short int) + 16384);
        // Create a buffer for the 32-bit floating point audio required by the effect.
        float *floatBuffer = (float *)malloc(decoder->getFramesPerChunk() * 2 * sizeof(float) + 16384);

        // Processing audio file
        // while (true)
        // {
        //     int framesDecoded = decoder->decodeAudio(intBuffer, decoder->getFramesPerChunk());
        //     if (framesDecoded < 1) break;

        //     // Submit the decoded audio to the analyzer.
        //     Superpowered::ShortIntToFloat(intBuffer, floatBuffer, framesDecoded);
        //     analyzer->process(floatBuffer, framesDecoded);

        // };

        analyzer->makeResults(60, 200, 0, 0, false, false, true, false, true);

        // // Create Key string with Camelot Wheel Notation and Chord Name
        // std::stringstream aKey;
        // aKey << Superpowered::camelotChordNames[analyzer->keyIndex] << " - " << Superpowered::musicalChordNames[analyzer->keyIndex];
    };
    // Return the stuff here
    void AudioAnalyzer::OnOK()
    {
        Callback().Call({Env().Null(), Napi::String::New(Env(), returnString)});
    }

    void AudioAnalyzer::OnError(const Napi::Error &e)
    {
    }
} // namespace AudioAnalyzer
